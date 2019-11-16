import React from 'react'
import * as Sentry from '@sentry/browser'
import { Center, Box, VBox } from 'react-layout-components'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Container from '@material-ui/core/Container'
import Red from '@material-ui/core/colors/red'

import ErrorIcon from '@material-ui/icons/Error'

import WindowSize from '../../lib/oldWindowSize'

const styles = {
    base: {
        margin: '0 auto',
        minHeight: '100vh',
        background:
            'url("https://images.unsplash.com/photo-1558346648-9757f2fa4474?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
    }
}

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props)
        this.state = { error: null }
    }

    componentDidCatch (error) {
        this.setState({ error })
        if (Meteor.isProduction) {
            Sentry.withScope(() => {
                Sentry.captureException(error)
            })
        }
    }

    render () {
        if (this.state.error) {
            //render fallback UI
            return (
                <div style={styles.base}>
                    <Container
                        column
                        style={{
                            height: '100%',
                            width: this.props.innerWidth < 960 ? this.props.innerWidth : this.props.innerWidth - 300,
                            margin: 'auto',
                            fontFamily: 'sans-serif',
                            marginLeft: this.props.innerWidth < 960 ? 0 : 300
                        }}>
                        <Paper style={{ padding: 20 }}>
                            <Box style={{ height: '100%' }}>
                                <Center
                                    column
                                    style={{
                                        height: 100,
                                        marginRight: 20
                                    }}>
                                    <ErrorIcon style={{ width: 60, height: 60, color: Red[400] }} />
                                </Center>
                                <VBox>
                                    <Typography style={{ marginBottom: 10 }}>
                                        Oops, something went wrong....
                                    </Typography>
                                    <Typography style={{ marginBottom: 10, letterSpacing: 0 }}>
                                        Sorry about that. Hit the button below to reload, and feel
                                        free to use the Feedback Button to help us prevent errors
                                        like these in the future.
                                    </Typography>
                                    <Box justifyContent="space-around">
                                        <Button
                                            onClick={() => {
                                                window.location.reload()
                                            }}>
                                            Reload
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                Sentry.captureException(new Error('React Error'))
                                                Sentry.showReportDialog()
                                            }}>
                                            Report Feedback
                                        </Button>
                                    </Box>
                                </VBox>
                            </Box>
                        </Paper>
                    </Container>
                </div>
            )
        } else {
            //when there's not an error, render children untouched
            return this.props.children
        }
    }
}

export default WindowSize(ErrorBoundary)
