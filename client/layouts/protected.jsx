import { observer, useObserver } from 'mobx-react-lite'
import React from 'react'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import Routes from 'views/routes'

import { makeStyles } from '@material-ui/core/styles'

import Navigation from 'components/navigation/navigation'
import ErrorBoundary from 'components/error/error'

const useStyles = makeStyles(theme => ({
    contentArea: {
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            marginLeft: 300,
            width: 'calc(100vw - 300px)',
        },
        [theme.breakpoints.down('sm')]: {
            overflow: 'scroll',
            paddingTop: 60
        }
    }
}))

const ContentArea = () => {
    const classes = useStyles()
    return useObserver(() => {
        return (
            <div className={classes.contentArea}>
                <Switch>
                    {Object.keys(Routes.protected).map(key => {
                        const route = Routes.protected[key]
                        return <Route component={route.view} exact key={key} path={route.path} />
                    })}
                </Switch>
            </div>
        )
    })
}

const ProtectedLayout = ({ location }) => {
    if (location.pathname === '/') {
        // Redirect to dashboard if logged in
        return <Redirect to="/dashboard" />
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Navigation />
            <ErrorBoundary type="nonAdmin">
                <ContentArea />
            </ErrorBoundary>
        </div>
    )
}
export default withRouter(observer(ProtectedLayout))
