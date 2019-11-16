import React, { useState } from 'react'
import { observer, useObserver } from 'mobx-react-lite'
import { withRouter } from 'react-router-dom'

import { Center } from 'react-layout-components'

import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import MenuIcon from '@material-ui/icons/Menu'

import { useStore } from 'state'

import Filter from 'components/filter/filter'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 1199 // the z-index of the nav drawer is 1200
    },
    bottomShadow: {
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        height: 10,
        marginTop: -10
    },
    container: {
        height: '100vh',
        width: 310,
        maxWidth: '90vw',
        overflow: 'hidden'
    },
    icon: {
        color: 'black'
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        width: '100%'
    },
    eightyWidth: {
        width: '80%'
    }
}))

const MobileNavigation = ({ children, history }) => {
    const classes = useStyles()
    const store = useStore()
    const headerStore = store.rootStore.header
    const userStore = store.rootStore.users
    const itemStore = store.rootStore.items
    const subscriptionStore = store.subscriptionStore
    const [disabled, setDisabled] = useState(true)

    const handleGoBack = () => {
        let path = headerStore.backButtonType
        switch (path) {
            case 'users':
                userStore.setSelectedId(null)
                subscriptionStore.searchTerm = ''
                break
            case 'items':
                itemStore.setSelected(null)
                break
        }
        headerStore.setTitle()
        history.goBack()
    }

    return useObserver(() => {
        return (
            <div className={classes.root}>
                <AppBar elevation={0} position="relative" color="none" className={classes.appBar}>
                    <Toolbar>
                        {!headerStore.goBackButtonState ? (
                            <IconButton
                                onClick={() => headerStore.setOpen(true)}
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                color="inherit"
                                aria-label="go back"
                                onClick={() => handleGoBack()}>
                                <KeyboardArrowLeft />
                            </IconButton>
                        )}
                        <div className={classes.flex}>
                            <div className={classes.flexBetween}>
                                <div className={`${classes.flex} ${classes.eightyWidth}`}>
                                    {headerStore.displayTitle}
                                </div>
                                {headerStore.filterData ?.length && !disabled ? <Filter /> : null}
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.bottomShadow} />
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={headerStore.open}
                    onClose={() => headerStore.setOpen(false)}
                    PaperProps={{ style: { backgroundColor: 'white' } }}>
                    <div className={classes.container}>{children}</div>
                </Drawer>
            </div>
        )
    })
}

export default withRouter(observer(MobileNavigation))
