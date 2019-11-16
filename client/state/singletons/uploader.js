import { observable, action } from 'mobx'

class UploaderStore {
    @observable files = []
    @observable file

    @action
    setFiles = files => {
        this.files = files
    }

    @action
    clearFiles = () => {
        this.files = []
        this.file = undefined
    }
}

export default UploaderStore
