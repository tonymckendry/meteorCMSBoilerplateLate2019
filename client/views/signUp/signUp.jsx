import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { useStore } from 'state'

const SignUp = () => {
    const { rootStore, authStore } = useStore()
    const routerStore = rootStore.router
    const classes = useStyles()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    if (authStore.currentUser) {
        // Redirect to wells if logged in
        return <Redirect to="/wells" />
    }

    const handleLogin = e => {
        e.preventDefault()
        if (!email || !password || !firstName || !lastName || !phoneNumber) {
            setError(true)
            return
        } else {
            setError(false)
        }
        Accounts.createUser(
            {
                email,
                password,
                profile: { firstName: firstName, lastName: lastName, phone: phoneNumber }
            },
            err => {
                if (err) {
                    console.log(err)
                } else {
                    rootStore.router.push('/dashboard')
                }
            }
        )
    }

    return (
        <Grid container direction="column" justify="center" className={classes.root}>
            <form onSubmit={handleLogin}>
                <Grid container>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            error={error && !email}
                            label="EMAIL"
                            InputProps={{
                                disableUnderline: true,
                                autoFocus: true
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.inputLabel
                                }
                            }}
                            variant="filled"
                            fullWidth
                            onChange={e => {
                                setEmail(e.target.value)
                            }} />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            error={error && !password}
                            label="PASSWORD"
                            InputProps={{
                                disableUnderline: true
                            }}
                            variant="filled"
                            InputLabelProps={{
                                classes: {
                                    root: classes.inputLabel
                                }
                            }}
                            type="password"
                            fullWidth
                            onChange={e => {
                                setPassword(e.target.value)
                            }} />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            error={error && !firstName}
                            label="FIRST NAME"
                            InputProps={{
                                disableUnderline: true
                            }}
                            variant="filled"
                            InputLabelProps={{
                                classes: {
                                    root: classes.inputLabel
                                }
                            }}
                            fullWidth
                            onChange={e => {
                                setFirstName(e.target.value)
                            }} />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            error={error && !lastName}
                            label="LAST NAME"
                            InputProps={{
                                disableUnderline: true
                            }}
                            variant="filled"
                            InputLabelProps={{
                                classes: {
                                    root: classes.inputLabel
                                }
                            }}
                            fullWidth
                            onChange={e => {
                                setLastName(e.target.value)
                            }} />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            error={error && !phoneNumber}
                            label="PHONE NUMBER"
                            InputProps={{
                                disableUnderline: true
                            }}
                            variant="filled"
                            InputLabelProps={{
                                classes: {
                                    root: classes.inputLabel
                                }
                            }}
                            fullWidth
                            onChange={e => {
                                setPhoneNumber(e.target.value)
                            }} />
                    </Grid>
                </Grid>
                <Typography color="error" style={{ opacity: error ? 1 : 0, marginTop: -10 }}>
                    All Fields are Required
                </Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}>
                    SIGN UP
                </Button>
                <Typography align="center" className={classes.loginLink}>
                    Already have an account?{' '}
                    <b onClick={() => routerStore.push('/')} style={{ cursor: 'pointer' }}>
                        Login
                    </b>
                </Typography>
            </form>
        </Grid>
    )
}
const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100vw',
            height: '100vh',
            [theme.breakpoints.up('sm')]: {
                background: 'white',
                backgroundSize: 'cover'
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            color: theme.palette.primary.main
        },
        button: {
            marginBottom: 10,
            padding: 15,
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        },

        textField: {
            marginBottom: 20
        },
        loginLink: {
            marginTop: 10,
            fontSize: '.9em'
        }
    }
})
export default observer(SignUp)
