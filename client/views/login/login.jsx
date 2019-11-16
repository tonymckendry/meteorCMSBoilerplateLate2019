import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useStore } from 'state'

import ResetPassword from '../../components/resetPassword/resetPassword'

const useStyles = makeStyles(theme => {
    return {
        root: {
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '2rem',
            color: theme.palette.primary.main
        },
        button: { marginTop: '1rem', padding: 15 },
        forgotPassword: { fontSize: '.8em' },
        signIn: { backgroundColor: theme.palette.primary.main, color: 'white' },
        textField: { marginBottom: 20 },
        '$.MuiInputLabel - shrink': { color: 'black' }
    }
})

const Login = () => {
    const { rootStore, authStore } = useStore()
    const routerStore = rootStore.router
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    if (authStore.currentUser) {
        // Redirect to dashboard if logged in
        return <Redirect to="/dashboard" />
    }

    const handleLogin = e => {
        e.preventDefault()
        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                console.error(err)
            } else {
                rootStore.router.push('/dashboard')
            }
        })
    }

    let content = (
        <>
            <form onSubmit={handleLogin}>
                <Grid container>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            label="EMAIL"
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                autoFocus: true
                            }}
                            variant="filled"
                            onChange={e => {
                                setEmail(e.target.value)
                            }} />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            label="PASSWORD"
                            type="password"
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                autoFocus: true
                            }}
                            variant="filled"
                            onChange={e => {
                                setPassword(e.target.value)
                            }} />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth className={`${classes.button} ${classes.signIn}`}>
                    Sign In
                </Button>
                <Button
                    fullWidth
                    className={classes.button}
                    onClick={() => routerStore.history.push('/sign-up')}>
                    Sign Up
                </Button>
            </form>
            <Button
                fullWidth
                className={`${classes.button} ${classes.forgotPassword}`}
                onClick={setShowForgotPassword}>
                Forgot Password
            </Button>
        </>
    )

    if (showForgotPassword || authStore.showForgotPassword) {
        content = <ResetPassword setShowForgotPassword={setShowForgotPassword} />

    }

    return (
        <Grid container direction="column" justify="center" className={classes.root}>
            {content}
        </Grid>
    )
}

export default observer(Login)
