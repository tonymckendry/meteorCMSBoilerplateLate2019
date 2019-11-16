import { action, observable } from 'mobx'

class AppStore {
    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @observable
    appLoading = false

    @action
    setAppLoading = bool => {
        this.appLoading = bool
    }
}

export default AppStore
