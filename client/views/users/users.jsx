import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'

import { VBox, Center } from 'react-layout-components'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { useStore } from 'state'
import withSubscribe from 'lib/withSubscribe'
import Paginator from 'components/paginator/paginator'

const Users = () => {
    const store = useStore()
    const userStore = store.rootStore.users
    const headerStore = store.rootStore.header
    const routerStore = store.rootStore.router
    const subscriptionStore = store.subscriptionStore
    const classes = useStyles()

    useEffect(() => {
        headerStore.setTitle('USERS')
    }, [])

    return useObserver(() => (
        <VBox>
            <Center column>
                <TextField
                    className={classes.search}
                    placeholder="Search"
                    onChange={e => subscriptionStore.setSearchTerm(e.target.value)} />
                {subscriptionStore.searchLoading && <CircularProgress />}
            </Center>
            <List className={classes.list}>
                {!subscriptionStore.searchLoading &&
                    userStore.filteredUsers.map(user => {
                        return (
                            <ListItem
                                key={user.id}
                                divider
                                button
                                onClick={() => routerStore.history.push('/user/' + user.id)}>
                                <ListItemText
                                    primary={user.fullName}
                                    secondary={
                                        user.springboardNum ? (
                                            'SB#: ' + user.springboardNum
                                        ) : (
                                            'No Springboard #'
                                        )
                                    } />
                                <KeyboardArrowRight />
                            </ListItem>
                        )
                    })}
            </List>
            <Paginator subscription="users" />
        </VBox>
    ))
}

export default withSubscribe('users')(Users)

const useStyles = makeStyles(theme => ({
    list: { height: '100%', overflowY: 'scroll' },
    search: { width: '90%', margin: '20px 0px 10px 0px' }
}))
