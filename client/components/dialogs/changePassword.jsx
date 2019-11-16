import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import { useStore } from 'state'

import PasswordField from 'material-ui-password-field'

import { Center } from 'react-layout-components'

//MUI
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { useWindowSize } from 'lib/useWindowSize'

const ChangePasswordDialog = ({ open, setOpen }) => {
    const { height, width } = useWindowSize()
    const store = useStore()
    const classes = useStyles({ height, width })
    const alertStore = store.rootStore.alert

    const [incorrectPassword, setIncorrectPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)

    const handleOldPasswordChange = value => { 
        setOldPassword(value)
    }

    const handleClose = () => {
        setOldPassword(null)
        setNewPassword(null)
        setOpen(false)
        setIncorrectPassword(false)
    }

    const submit = () => {
        Accounts.changePassword(oldPassword, newPassword, err => {
            if (err) {
                console.log(err)
                setIncorrectPassword(true)
            } else {
                setOpen(false)
                setIncorrectPassword(false)
                setOldPassword(null)
                setNewPassword(null)
                alertStore.dispatch('Password successfully changed', 'success')
            }
        })
    }

    return useObserver(() => {
        return (
            <Dialog open={open}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Center column style={{ width: 500, maxWidth: '95%' }}>
                        <FormControl error={incorrectPassword}>
                            <PasswordField
                                className={classes.passwordField}
                                label="Old Password"
                                onChange={e => {
                                    handleOldPasswordChange(e.target.value)
                                }} />
                            <FormHelperText>
                                {incorrectPassword ? 'Incorrect Password' : null}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <PasswordField
                                className={classes.passwordField}
                                label="New Password"
                                onChange={e => {
                                    setNewPassword(e.target.value)
                                }} />
                        </FormControl>
                    </Center>
                </DialogContent>
                <DialogActions>
                    <Button id="cancelChangePasswordButton" onClick={handleClose}>
            Cancel
                    </Button>
                    <Button id="submitNewPassword" onClick={submit}>
            Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    })
}

ChangePasswordDialog.propTypes = {
    classes: PropTypes.object
}

const useStyles = makeStyles(() => ({
    dialogContent: { width: 300, maxWidth: '95vw' }
}))

export default ChangePasswordDialog
