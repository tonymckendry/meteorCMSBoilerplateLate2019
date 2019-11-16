import { Meteor } from 'meteor/meteor'

import isUndefined from 'lodash.isundefined'

Meteor.publish('users', function (options) {
    let autorunHandler
    this.autorun(function (comp) {
        if (isUndefined(autorunHandler)) {
            autorunHandler = comp
        }

        let cursors = []
        let users = findUsers(options, true, this.userId)
        cursors.push(users)
        return cursors
    })

    this.onStop(() => {
        if (!isUndefined(autorunHandler)) {
            autorunHandler.stop()
        }
    })
})

const findUsers = (options, publishing, currentUserId) => {
    let query = {}
    let publish = publishing
    let theUser = Meteor.users.findOne({ _id: options.user })

    if (options.searchTerm) {
        if (!query['$or']) {
            query['$or'] = []
        }
        query['$or'].push(
            { 'profile.firstName': { $regex: options.searchTerm, $options: 'i' } },
            { 'profile.lastName': { $regex: options.searchTerm, $options: 'i' } }
        )
    }
    let cleanup = {}
    if (publish) {
        cleanup = { limit: 10, skip: (options.page - 1) * 10, sort: { 'profile.firstName': 1 } }
    }
    return Meteor.users.find(query, cleanup)
}

Meteor.methods({
    'users.getTotals': function (options) {
        let users = findUsers(options, false, this.userId)
        return { count: users.count() }
    }
})
