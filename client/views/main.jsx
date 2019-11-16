// PACKAGES
import React from 'react'
import { observer } from 'mobx-react-lite'
import { Router } from 'react-router-dom'
// MUI
import { MuiThemeProvider } from '@material-ui/core/styles'
//STATE
import StoreProvider from 'state'
import rootStore from 'state/singletons'
import authStore from 'state/auth'
import { browserHistory } from 'state/singletons/router'
import subscriptionStore from 'state/subscriptions'
// LAYOUTS
import Routes from 'layouts/routes'
// STYLES
import Theme from 'styles/theme'
// COMPONENTS
import Alert from 'components/alert/alert'

const Main = props => {
    return (
        <StoreProvider initialData={{ rootStore, subscriptionStore, authStore }}>
            <MuiThemeProvider theme={Theme}>
                <Router history={browserHistory}>
                    <Routes {...props} />
                </Router>
                <Alert />
            </MuiThemeProvider>
        </StoreProvider>
    )
}

export default observer(Main)
