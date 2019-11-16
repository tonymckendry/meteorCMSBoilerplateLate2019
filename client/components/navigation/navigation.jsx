import React, { Fragment } from 'react'
import { observer, useObserver } from 'mobx-react-lite'
import { useStore } from 'state'
import { useWindowSize } from 'lib/useWindowSize'

import { Center } from 'react-layout-components'

//components
import MobileNavigation from './mobileNavigation'
import DesktopNavigation from './desktopNavigation'
import NavigationItem from './navigationItem'

//MUI
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import DashboardIcon from '@material-ui/icons/Dashboard'
import Lightning from '@material-ui/icons/FlashOn'
import People from '@material-ui/icons/People'
import Face from '@material-ui/icons/Face'

const GeneralNavigation = () => {
    const classes = useStyles()
    const store = useStore()
    const authStore = store.authStore
    const headerStore = store.rootStore.header
    const user = authStore.currentUser
    return useObserver(() => (
        <div>
            <Center column>
                <Avatar
                    src={
                        user.picture && (
                            user.picture
                        )
                    }
                    className={classes.avatar} />
                <Typography className={classes.username} align="center">
                    {user.fullName.toUpperCase()}
                </Typography>
            </Center>
            <List className={classes.list}>
                <div style={{ height: 1, width: '100%', backgroundColor: 'rgba(0,0,0,.35)' }} />
                <NavigationItem
                    onClick={() => headerStore.setOpen(false)}
                    title="DASHBOARD"
                    icon={
                        <DashboardIcon />
                    }
                    href="/dashboard" />
                <NavigationItem
                    title="MY PROFILE"
                    onClick={() => headerStore.setOpen(false)}
                    icon={<Face />}
                    href="/profile" />
                <Admin />
            </List>
        </div>
    ))
}
const Navigation = () => {
    const { width } = useWindowSize()
    const isMobile = width < 960

    return isMobile ? (
        <MobileNavigation>
            <GeneralNavigation />
        </MobileNavigation>
    ) : (
            <DesktopNavigation>
                <GeneralNavigation />
            </DesktopNavigation>
        )
}
const Admin = () => {
    const store = useStore()
    const authStore = store.authStore
    const headerStore = store.rootStore.header
    return useObserver(() => {
        if (authStore.currentUser.isAdmin) {
            return (
                <NavigationItem
                    onClick={() => headerStore.setOpen(false)}
                    title="ADMIN"
                    icon={<Lightning />}
                    href="/users" />
            )
        }
        return null
    })
}

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: 20,
        marginTop: 20
    },
    container: {
        height: '100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main
    },
    paper: { backgroundColor: theme.palette.primary.main },
    list: {
        height: '100vh',
        width: '100%',
        color: 'white'
    },
    icon: {
        color: theme.palette.common.white
    },
    img: { width: 150, margin: 10 },
    mobileLogo: {
        height: 45
    },
    flex: {
        display: 'flex',
        width: '80%',
        justifyContent: 'center'
    },
    svg: {
        height: 25,
        width: 25,
        fill: 'black'
    },
    username: { marginBottom: 20, fontSize: '.9em' }
}))

Navigation.propTypes = {}

export default observer(Navigation)
