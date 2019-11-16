import RouterStore from './router'
import AppStore from './app'
import UsersStore from './users'
import PaginationStore from './pagination'
import HeaderStore from './header'
import UploaderStore from './uploader'
import AlertStore from './alert'
class RootStore {
    constructor () {
        this.router = new RouterStore(this)
        this.app = new AppStore(this)
        this.users = new UsersStore(this)
        this.pagination = new PaginationStore(this)
        this.header = new HeaderStore(this)
        this.uploader = new UploaderStore(this)
        this.alert = new AlertStore(this)
    }
}

const singleton = new RootStore()

export default singleton
