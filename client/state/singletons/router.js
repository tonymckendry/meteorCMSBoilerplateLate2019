import { action, observable } from 'mobx'
import { createBrowserHistory } from 'history'

export const browserHistory = createBrowserHistory()

class RouterStore {
    @observable location = {}
    @observable history = {}
    @observable match = {}

    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @action
    setRoute = (location, history, match) => {
        this.location = location
        this.history = history
        this.match = match
    }

    @action
    push = path => this.history.push(path)
}

export default RouterStore
