import { observable, action, computed } from 'mobx'
import autorun from 'meteor/space:tracker-mobx-autorun'

import observe from 'lib/observe-cursor'

import rootStore from 'state/singletons'
import User from 'state/prototypes/user'

class UserSubscriptions {
    constructor (root) {
        this.rootStore = root
    }

    @observable handle = {}

    @observable tracker = {}

    getUsers = autorun(() => {
        this.tracker = Tracker.autorun(() => {
            if (this.handle.ready()) {
                let userCursor = Meteor.users.find({})
                observe(
                    'Users',
                    rootStore.users.users,
                    this.handle,
                    userCursor,
                    this.rootStore.loading,
                    User
                )
                this.rootStore.loading = false
            }
        })
    })

    @computed
    get options () {
        return {
            user: rootStore.users.selectedId,
            page: rootStore.pagination.page,
            searchTerm: this.rootStore.searchTerm
        }
    }

    subscribe = () => {
        this.rootStore.loading = true
        this.handle = Meteor.subscribe('users', this.options)
        this.getUsers.start()
    }

    @action
    unsubscribe = () => {
        this.handle.stop()
        this.tracker.stop()
        this.getUsers.stop()
        rootStore.users.reset()
    }
}

export default UserSubscriptions
