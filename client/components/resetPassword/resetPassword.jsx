import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'

import { Center, Box, VBox } from 'react-layout-components'

import PasswordField from 'material-ui-password-field'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import CheckCircle from '@material-ui/icons/CheckCircle'
import Error from '@material-ui/icons/Error'

import { useStore } from 'state'

const ResetPassword = ({ setShowForgotPassword }) => {
    const store = useStore()
    const authStore = store.authStore
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [noUser, setNoUser] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordReset, setPasswordReset] = useState(null)

    const handleSendEmail = () => {
        setLoading(true)
        Meteor.call('password.resetEmail', email, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                if (res === 'invalid') {
                    setNoUser(true)
                }
                setLoading(false)
                setEmailSent(true)
                setEmail(null)
                setTimeout(() => {
                    setShowForgotPassword(false)
                    setEmailSent(false)
                    setNoUser(false)
                }, 2000)
            }
        })
    }

    const handlePasswordReset = () => {
        setLoading(true)
        Accounts.resetPassword(authStore.resetToken, password, err => {
            if (err) {
                console.log(err)
            } else {
                authStore.setResetToken(null)
                setLoading(false)
                setPasswordReset(true)
                setPassword(null)
                setTimeout(() => {
                    setShowForgotPassword(false)
                    setPasswordReset(false)
                }, 2000)
            }
        })
            
    }

    const handleCancel = () => {
        setShowForgotPassword(false)
        setEmail(null)
    }

    return useObserver(() => {
        let content = (
            <Center column>
                <Typography className={classes.headerText}>Forgot Username or Password</Typography>
                <p className={classes.pText}>
                    If your email is found in our system you will be sent a reset password link.
                </p>
                <TextField
                    label="EMAIL"
                    fullWidth
                    className={classes.field}
                    variant="filled"
                    InputProps={{
                        disableUnderline: true,
                        autoFocus: true
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.inputLabel
                        }
                    }}
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                />
                <Box justifyContent="space-around" className={classes.btnContainer}>
                    <Button variant="flat" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="flat" onClick={handleSendEmail}>
                        Submit
                    </Button>
                </Box>
            </Center>
        )
        if (!loading && emailSent && !noUser) {
            content = (
                <VBox className={classes.emailSentContainer}>
                    <Center column>
                        <CheckCircle className={classes.checkCircle} />
                        <Typography variant="title">Reset password link sent</Typography>
                    </Center>
                </VBox>
            )
        }
        if (!loading && passwordReset) {
            content = (
                <VBox className={classes.emailSentContainer}>
                    <Center column>
                        <CheckCircle className={classes.checkCircle} />
                        <Typography variant="title">Password Reset</Typography>
                    </Center>
                </VBox>
            )
        }
        if (!loading && emailSent && noUser) {
            content = (
                <VBox className={classes.emailSentContainer}>
                    <Center column>
                        <Error className={classes.checkCircle} />
                        <Typography variant="title">User does not exist</Typography>
                    </Center>
                </VBox>
            )
        }
        if (loading) {
            content = (
                <Center column justifyContent="space-around">
                    <Typography className={classes.waitText}>Please wait...</Typography>
                    <CircularProgress />
                </Center>
            )
        }
        if (authStore.showPasswordResetOnly && !loading && !passwordReset)  {
            content = (
                    <>
                        <Typography className={classes.enterPassword}>Enter a new password</Typography>
                        <Center column>
                            <PasswordField
                                className={classes.passwordField}
                                label="New Password"
                                onChange={e => {
                                   setPassword(e.target.value)
                                }}
                            />
                            <Button onClick={handlePasswordReset}>
                                Submit
                            </Button>
                        </Center>
                    </>

            )
            
        }
        return <React.Fragment>{content}</React.Fragment>
    })
}

export default ResetPassword

const useStyles = makeStyles(theme => ({
    waitText: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
    },
    emailSentContainer: { marginTop: 10, textAlign: 'center' },
    checkCircle: { height: 40, width: 40, marginBottom: 10 },
    headerText: { textAlign: 'center', fontSize: 16, marginBottom: 10 },
    pText: {
        textAlign: 'center',
        margin: '10px 0px',
        fontSize: 12
    },
    field: { margin: '20px 0px' },
    btnContainer: { width: '100%', margin: '20px 0px' },
    enterPassword: {textAlign: 'center', marginBottom: 20},
    passwordField: {marginBottom: 20}
}))
