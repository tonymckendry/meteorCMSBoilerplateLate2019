import { action, computed, observable } from 'mobx'

export default class AlertStore {
    @observable alert = { open: false }

    @action dispatch = (message, category) => {
        this.alert = { message, category, open: true }
    }

    @action handleClose = () => {
        this.alert = { open: false }
    }

    @computed
    get open () {
        return this.alert.open
    }

    @computed
    get category () {
        return this.alert.category
    }

    @computed
    get message () {
        return this.alert.message
    }
}
