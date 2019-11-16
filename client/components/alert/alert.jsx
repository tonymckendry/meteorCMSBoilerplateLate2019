import React from 'react'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

import { useStore } from 'state'
import { useWindowSize } from 'lib/useWindowSize'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
}

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: theme.palette.success.main
    },
    error: {
        backgroundColor: theme.palette.error.main
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: theme.palette.warning.main
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
}))

const ContentWrapper = ({ message, onClose, variant, ...extra }) => {
    const classes = useStyles()
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={[classes.icon, classes.iconVariant].join(' ')} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...extra}
        />
    )
}

ContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func
}

const Alert = () => {
    const store = useStore()
    const { width } = useWindowSize()
    const alertStore = store.rootStore.alert

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        alertStore.handleClose(false)
    }

    return alertStore.open ? (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            open={alertStore.open}
            autoHideDuration={3000}
            onClose={handleClose}>
            <ContentWrapper
                onClose={handleClose}
                variant={alertStore.category}
                message={alertStore.message}
            />
        </Snackbar>
    ) : null
}

export default observer(Alert)
