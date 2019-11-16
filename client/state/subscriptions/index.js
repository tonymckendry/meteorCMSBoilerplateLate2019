import { observable, action } from 'mobx'

import UserStore from './users'

import rootStore from 'state/singletons'

class SubscriptionStore {
    constructor () {
        this.users = new UserStore(this)
    }

    @observable loading = true
    @observable searchLoading = false
    @observable searchTerm = ''

    @action setSearchTerm = term => {
        // we want to wait until the user has stopped typing for 2 secs before we make the call
        // so that we dont make a bunch of unnecessary calls
        clearTimeout(this.countdown)
        // rootStore.pagination.page = 1
        // rootStore.pagination.totalPages = 0
        this.searchTerm = term
        this.searchLoading = true
        this.startCountdown()
    }

    @action
    startCountdown = () => {
        this.countdown = setTimeout(
            action(() => {
                this.resetSub()
            }),
            1000
        )
    }

    @action
    resetSub = () => {
        // had to add this if bc it was trying to rerun the hub subscription on a landbase edit
        // (to get associated hubs) and crashing when you opened the form to edit
        let store = rootStore.pagination.currentStore
        this[store].unsubscribe()
        this[store].subscribe()
        rootStore.pagination.getTotalResults()
        setTimeout(() => {
            this.searchLoading = false
            // a little delay is needed for the data to setup and not flash
        }, 500)
    }
}

const singleton = new SubscriptionStore()

export default singleton
