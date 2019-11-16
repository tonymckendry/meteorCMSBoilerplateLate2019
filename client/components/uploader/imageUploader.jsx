import React, { useEffect, useState, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import { useObserver } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import IconUpload from '@material-ui/icons/CloudUpload'

import { readFiles } from 'lib/fileReader'
import { useWindowSize } from 'lib/useWindowSize'

import { useStore } from 'state'
import theme from 'styles/theme'

const Loader = ({ loading }) => (
    <Fade in={loading} style={{ transitionDelay: loading ? '500ms' : '0ms' }} unmountOnExit>
        <CircularProgress color="primary" />
    </Fade>
)

const ImageUploader = ({ loading, onChange, onSave, showButtons, single }) => {
    const [images, setImages] = useState([])
    const currentImage = images[0]
    const store = useStore()
    const uploaderStore = store.rootStore.uploader
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        accept: ['image/*', 'application/pdf'],
        multiple: true,
        onDrop: f =>
            readFiles(f).then(i => {
                handleDrop(i)
                onChange && onChange(i)
            })
    })
    const handleDrop = i => {
        setImages([...images, i[0]])
        uploaderStore.setFiles([...images, i[0]])
    }
    const { width } = useWindowSize()
    const isMobile = width < 600

    const classes = useStyles({ isDragActive, isDragReject })

    const handleSave = async () => {
        await onSave(images)
        setImages([])
    }

    useEffect(
        () => {
            return () => images.forEach(file => URL.revokeObjectURL(file.preview))
        },
        [images]
    )

    return useObserver(() => {
        return (
            <>
                {single ? (<div
                    {...getRootProps()}
                    className={classes.dropzoneSingle}
                    style={{
                        borderColor: isDragActive
                            ? theme.palette.primary.main
                            : isDragReject
                                ? theme.palette.error.main
                                : theme.palette.gray
                    }}>
                    <input {...getInputProps()} />
                    {currentImage && (
                        <div className={classes.thumb}>
                            <div className={classes.thumbInner}>
                                <img src={currentImage.preview} className={classes.img} alt="" />
                            </div>
                        </div>
                    )}

                    {!isMobile && (
                        <div className={classes.innerContainer}>
                            <IconUpload />
                            <p>Drag and drop or click here</p>
                        </div>
                    )}
                </div>) : (
                        <Fragment>
                            <div {...getRootProps()} className={classes.dropzone}>
                                <div className={classes.innerZone}>
                                    <IconUpload className={classes.icon} />
                                    <Button>{isMobile ? 'Tap Here' : 'Drag and drop or click here'}</Button>
                                </div>
                                <input {...getInputProps()} />
                            </div>
                            {images.length > 0 && (
                                <Fragment>
                                    <Typography>Preview</Typography>
                                    <Grid container>
                                        {images.map(image => {
                                            return (
                                                <Grid item xs={12} sm={4} md={3} lg={2} key={image.preview} className={classes.previewContainer}>
                                                    <img src={image.uri} className={classes.image} />
                                                </Grid>
                                            )
                                        }
                                        )}
                                    </Grid>
                                    {showButtons && (
                                        <Grid container justify="flex-end">
                                            {loading ? (
                                                <Loader loading={loading} />
                                            ) : (
                                                    <Fragment>
                                                        <Button onClick={() => setImages([])}>Cancel</Button>
                                                        <Button onClick={handleSave}>Save</Button>
                                                    </Fragment>
                                                )}
                                        </Grid>
                                    )}
                                </Fragment>
                            )}
                        </Fragment>
                    )}
            </>
        )
    })
}

const roundedContainer = {
    height: '15rem',
    width: '15rem',
    borderRadius: '50%'
}

const useStyles = makeStyles(theme => {
    return {
        dropzone: {
            border: '.1rem dashed grey',
            borderRadius: 8,
            height: 100,
            marginBottom: 16,
            borderColor: props =>
                props.isDragActive
                    ? theme.palette.primary.main
                    : props.isDragReject ? theme.palette.error.main : theme.palette.gray,
            '&:focus': {
                outline: 'none'
            }
        },
        dropzoneSingle: {
            marginBottom: '1rem',
            [theme.breakpoints.up('sm')]: {
                ...roundedContainer,
                border: '.2rem dashed grey',
                position: 'relative'
            }
        },
        innerZone: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center'
        },
        iconUpload: {
            fontSize: '2.5rem'
        },
        image: {
            cursor: 'pointer',
            height: 100,
            objectFit: 'cover',
            padding: 1,
            width: '100%'
        },
        thumb: {
            ...roundedContainer,
            display: 'inline-flex',
            padding: '.5rem',
            boxSizing: 'border-box'
        },
        img: {
            ...roundedContainer,
            objectFit: 'cover',
            display: 'block',
            width: '100%',
            height: '100%',
            zIndex: 3
        },
        thumbInner: {
            display: 'flex',
            minWidth: 0,
            overflow: 'hidden'
        },
        innerContainer: {
            cursor: 'pointer',
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'sans-serif'
        },
        previewContainer: { margin: 5 },
        pdf: { margin: 'auto' }
    }
})

export default ImageUploader
