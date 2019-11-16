import { observable, action } from 'mobx'

import subscriptionStore from 'state/subscriptions'

class Pagination {
    @observable page = 1
    @observable totalPages = 0
    @observable currentStore = null

    @action
    setCurrentStore = store => {
        this.currentStore = store
        this.getTotalResults()
    }

    @action
    setPage = page => {
        this.page = page
        subscriptionStore[this.currentStore].unsubscribe()
        subscriptionStore[this.currentStore].subscribe()
    }

    @action
    getTotalResults = () => {
        this.totalPages = 0
        Meteor.call(this.currentStore + '.getTotals', subscriptionStore[this.currentStore].options, (err, res) => {
            if (err) {
                console.error(err)
            } else {
                this.totalPages = Math.ceil(res.count / 10)
            }
        })
    }

    @action
    reset = () => {
        this.page = 1
        this.totalPages = 0
        this.currentStore = null
    }
}

export default Pagination
