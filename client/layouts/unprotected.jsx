import { observer } from 'mobx-react-lite'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from 'views/routes'

const UnprotectedLayout = ({ children }) => {
    return (
        <Switch>
            {Object.keys(Routes.unprotected).map(key => {
                const route = Routes.unprotected[key]
                return <Route component={route.view} exact key={key} path={route.path}></Route>
            })}
        </Switch>
    )
}
export default observer(UnprotectedLayout)
