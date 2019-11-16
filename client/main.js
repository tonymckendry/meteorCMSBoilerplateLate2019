import React from 'react'
import ReactDOM from 'react-dom'
import autorun from 'meteor/space:tracker-mobx-autorun'

import Main from 'views/main.jsx'
import isNull from 'lodash.isnull'

import AuthStore from 'state/auth'
import RootStore from 'state/singletons'

import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

// deployment token generated 11.13.19

/**
 * Set global application loading state when user is logging in
 */
const isLoggingIn = autorun(() => {
    // we use this to show a loading animation while things get set up
    AuthStore.setLoggingIn(Meteor.loggingIn() && !Meteor.user())
})

/**
 * Always keep an updated copy of the user in the store
 */
const ReactiveUser = autorun(() => {
    const activeUser = !isNull(Meteor.user())
    AuthStore.authenticate(activeUser)
})

if (Meteor.isClient) {
    Accounts.onLogin(() => {
        AuthStore.setUser(Meteor.user())
    })

    Accounts.onLogout(() => {
        AuthStore.setUser(null)
        AuthStore.userSubscriptions === null
    })

    Accounts.onResetPasswordLink(token => {
        AuthStore.setResetToken(token)
    })

    Meteor.startup(() => {
        isLoggingIn.start()
        ReactiveUser.start()
        ReactDOM.render(<Main />, document.getElementById('render-target'))
    })
}
