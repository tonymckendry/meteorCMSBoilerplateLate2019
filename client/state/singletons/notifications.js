import { observable, action, computed } from 'mobx'
import sortBy from 'lodash.sortby'

class NotificationStore {
    @observable notifications = []

    @observable isSwiping = false

    @computed get sortedNotifications () {
        return sortBy(this.allNotifications, n => {
            return n.date
        }).reverse()
    }

    @action deleteNotification = id => {
        Meteor.call('deleteNotification', id, err => {
            if (err) {
                console.error(err) // eslint-disable-line
            } else {
                this.setSwiping(false)
            }
        })
    }

    @action setSwiping = swiping => {
        this.isSwiping = swiping
    }

    @action reset = () => {

    }
}

export default NotificationStore
