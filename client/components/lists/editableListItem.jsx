import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TextField from '@material-ui/core/TextField'
import IconClose from '@material-ui/icons/Close'
import IconSave from '@material-ui/icons/Save'

import { makeStyles } from '@material-ui/core/styles'

const EditableListItem = ({ onChange, value, placeholder, siteObservation, type }) => {
    const classes = useStyles()
    const inputRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [fieldValue, setFieldValue] = useState(value)

    const handleCancel = event => {
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
        setFieldValue(value)
    }

    const handleSave = () => {
        setOpen(false)
        onChange && onChange(fieldValue)
    }
    useEffect(() => {
        if (open) {
            inputRef.current && inputRef.current.focus()
        }
    }, [open])
    return open ? (
        <ListItem alignItems="center" divider >
            <div className={classes.container}>
                <div className={classes.iconGroup}>
                    <ListItemIcon className={classes.iconCancel} onMouseDown={handleCancel}>
                        <IconClose />
                    </ListItemIcon>
                    <ListItemIcon className={classes.iconSave} onClick={handleSave}>
                        <IconSave />
                    </ListItemIcon>
                </div>
                <TextField
                    type={type}
                    multiline
                    onKeyPress={e => e.key === 'Enter' && handleSave(e)}
                    inputRef={inputRef}
                    className={classes.textField}
                    value={fieldValue}
                    onBlur={handleSave}
                    onChange={e => setFieldValue(e.target.value)}
                    placeholder={placeholder} />
            </div>
        </ListItem>
    ) : (
        <ListItem className={siteObservation ? classes.siteObservation : null} divider button onClick={() => {
            setOpen(true)
        }}>
            <ListItemText
                primary={value ? (<span>{value}</span>) : (<span className={classes.placeholder}>{placeholder}</span>)} />
        </ListItem>
    )
}

EditableListItem.propTypes = {
    classes: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string
}

const useStyles = makeStyles(theme => {
    return {
        listItem: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        iconGroup: {
            display: 'flex',
            alignItems: 'center',
            marginRight: 8
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        iconCancel: {
            cursor: 'pointer',
            color: theme.palette.error.main,
            margin: 4,
            minWidth: '30px',
            justifyContent: 'center',
        },
        iconSave: {
            cursor: 'pointer',
            color: theme.palette.success.main,
            margin: 0,
            minWidth: '30px',
            justifyContent: 'center',
        },
        textField: {
            width: '100%'
        },
        placeholder: {
            color: theme.palette.placeholderGray
        },
        siteObservation: {
            marginLeft: -15
        },
        value: { marginLeft: -13 }
    }

})
export default EditableListItem
