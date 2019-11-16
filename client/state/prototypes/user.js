import { observable, action, computed } from 'mobx'

class User {
    constructor (id, user) {
        this._user = user
    }

    @action
    updateState = user => {
        this._user = user
    }

    @observable _user

    @computed
    get id () {
        return this._user._id
    }

    @computed
    get firstName () {
        return this._user.profile.firstName
    }

    @computed
    get lastName () {
        return this._user.profile.lastName
    }

    @computed
    get fullName () {
        return this.firstName + ' ' + this.lastName
    }

    @computed
    get phone () {
        return this._user.profile.phone
    }

    @computed
    get email () {
        return this._user.emails.slice()[0].address
    }

    @computed
    get picture () {
        return this._user.profile.picture
    }
}

export default User
