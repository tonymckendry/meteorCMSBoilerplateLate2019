import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'

import { Center } from 'react-layout-components'

import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

import ImageUploader from './imageUploader'

import { useStore } from 'state'

const UploaderDialog = ({ open, setOpen, title, type, databaseId, otherId, additionalId, single }) => {
    const store = useStore()
    const classes = useStyles()
    const alertStore = store.rootStore.alert
    const uploaderStore = store.rootStore.uploader
    const [loading, setLoading] = useState(false)

    const handleUpload = () => {
        setLoading(true)
        Meteor.call(
            'uploadPic',
            databaseId,
            uploaderStore.files,
            type,
            otherId,
            additionalId,
            (err, res) => {
                if (err) {
                    console.log(err)
                    setOpen(false)
                    setLoading(false)
                    alertStore.dispatch('Something went wrong', 'error')

                } else {
                    setOpen(false)
                    setLoading(false)
                    alertStore.dispatch('Profile picture uploaded', 'success')
                }
            }
        )
    }

    return useObserver(() => (
        <Dialog open={open}>
            {loading ? (<DialogContent>
                <Center column>
                    <Typography className={classes.text} variant="title">File(s) Uploading...</Typography>
                    <LinearProgress
                        className={classes.loading} variant="indeterminate" />
                </Center>
            </DialogContent>) : (<>
                <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
                <DialogContent className={single ? classes.single : classes.multiple}>
                    <Center>
                        <ImageUploader
                            loading={false}
                            single={single} />
                    </Center>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload}>Submit</Button>
                </DialogActions>
            </>)}
        </Dialog>
    ))
}

export default UploaderDialog

const useStyles = makeStyles(theme => ({
    single: { width: '100%', maxWidth: '95vw' },
    multiple: { width: 500, maxWidth: '95vw' },
    loading: { height: 20, width: 150, margin: '10px 0px' },
    text: { fontFamily: 'sans-serif' },
    dialogTitle: { textAlign: 'center' }
}))
