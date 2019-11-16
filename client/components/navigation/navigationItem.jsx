import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useStore } from 'state'

const NavigationItem = ({ title, icon, activeIcon, href, onClick }) => {
    const store = useStore()
    const headerStore = store.rootStore.header
    const classes = useStyles()
    const routerStore = store.rootStore.router
    const handleNavClick = e => {
        if (onClick) onClick(e)
        headerStore.setOpen(false)
    }
    return useObserver(() => {
        let isActive = routerStore.location.pathname === href
        return (
            <NavLink
                to={href}
                activeClassName={classes.selectedItem}
                onClick={handleNavClick}
                className={classes.listItemText}>
                <ListItem className={classes.navItem} button divider>
                    <ListItemIcon className={classes.icon}>{isActive && activeIcon ? activeIcon : icon}</ListItemIcon>
                    <ListItemText primary={<span className={classes.title}>{title}</span>} />
                </ListItem>
            </NavLink>
        )
    })
}

export default NavigationItem

const baseLink = {
    display: 'flex',
    textDecoration: 'none'
}

const useStyles = makeStyles(theme => ({
    listItemText: {
        ...baseLink,
        color: 'black'
    },
    icon: {
        color: 'black',
        fill: 'black'
    },
    selectedItem: {
        ...baseLink,
        '& span': {
            color: 'white'
        },
        '& svg': {
            fill: 'white'
        },
        backgroundColor: 'black'
    },
    nested: { paddingLeft: 15 },
    navItem: { display: 'flex', justifyContent: 'space-between', height: 57, borderBottom: '1px solid rgba(0,0,0,.35)' },
    badge: {
        marginRight: 20,
        backgroundColor: 'red',
        color: theme.palette.common.white
    },
    title: {
        fontSize: '.75em'
    }
}))
