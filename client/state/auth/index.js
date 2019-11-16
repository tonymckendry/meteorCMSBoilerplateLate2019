import { action, observable } from 'mobx'

import isNull from 'lodash.isnull'

import User from 'state/prototypes/user'

import rootStore from 'state/singletons'

class AuthStore {
    @observable loading = false
    @observable currentUser = null
    @observable userSubscriptions = []
    @observable open = false
    @observable resetToken = null
    @observable showPasswordResetOnly = false
    @observable showForgotPassword = false

    @action
    setUser = user => {
        this.currentUser = user ? new User(user._id, user) : null
        return this.currentUser
    }

    @action
    authenticate = bool =>
        new Promise(resolve => {
            if (bool) {
                this.setUser(Meteor.user())
                resolve(this.currentUser)
            } else {
                this.setUser(null)
                this.userSubscriptions = []
                resolve(null)
            }
        })

    @action
    updateUser = (key, value) => {
        const userId = this.currentUser.id
        const payload = { userId, key, value }

        Meteor.call('user.update', payload, err => {
            if (err) {
                console.error(err) // eslint-disable-line
                rootStore.alert.dispatch('Something went wrong', 'error')
            } else {
                rootStore.alert.dispatch('Profile successfully updated', 'success')
            }
        })
    }

    @action
    setResetToken = token => {
        this.resetToken = token
        if (!isNull(token)) {
            this.showForgotPassword = true
            this.showPasswordResetOnly = true
        } else {
            this.showForgotPassword = false
            this.showPasswordResetOnly = false
        }
    }

    @action
    logout = () => {
        Meteor.logout(() => {
            rootStore.router.push('/')
            this.setUser(null)
        })
    }

    @action
    setLoggingIn = bool => {
        this.loading = bool
    }
}

const singleton = new AuthStore()

export default singleton
