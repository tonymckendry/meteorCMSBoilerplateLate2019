import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import isUndefined from 'lodash.isundefined'

Meteor.methods({
    'password.resetEmail': function (email) {
        let user = Meteor.users.findOne({
            'emails.address': { $regex: new RegExp('^' + email, 'i') }
        })
        if (!isUndefined(user)) {
            Accounts.sendResetPasswordEmail(user._id)
        } else {
            return 'invalid'
        }
    },
    'user.update': payload => {
        Meteor.users.update({ _id: payload.userId }, { $set: { [payload.key]: payload.value } })
    }
})
