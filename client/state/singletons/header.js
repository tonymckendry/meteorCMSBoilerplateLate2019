import React from 'react'
import { observable, action, computed } from 'mobx'
import { Box, Center } from 'react-layout-components'

import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import isNull from 'lodash.isnull'

import rootStore from 'state/singletons'

class HeaderStore {
    @observable open = false
    @observable title = ''

    @computed
    get backButtonType () {
        return ''
    }

    @computed
    get goBackButtonState () {
        if (rootStore.users.selectedId) {
            return true
        }
        return false
    }

    @computed get displayTitle () {
        if (rootStore.users.selectedId) {
            return <Box>
                <Avatar src={rootStore.users.selectedUser ?.picture} />
                <Center column style={{ height: '100%', marginLeft: 10 }}><Typography style={{ fontSize: 14 }}>{rootStore.users.selectedUser.fullName}</Typography></Center>
            </Box>
        }
        return <Typography>
            {this.title}
        </Typography>
    }

    @action
    setOpen = bool => {
        this.title = ''
        this.open = bool
    }

    @action setTitle = title => (this.title = title)
}

export default HeaderStore
