import { observable, action, computed } from 'mobx'

class Users {
    @observable users = []
    @observable selectedId

    @computed
    get filteredUsers () {
        return this.users.filter(u => u.id !== Meteor.userId())
    }

    @computed
    get selectedUser () {
        return this.users.find(user => user.id == this.selectedId) || {}
    }

    @action setSelectedId = id => (this.selectedId = id)

    @action reset = () => { }
}

export default Users
