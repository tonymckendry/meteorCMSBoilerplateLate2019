import React, { useEffect, useState, Fragment } from 'react'
import { useObserver } from 'mobx-react-lite'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { useStore } from 'state'
import withSubscribe from 'lib/withSubscribe'
import { useWindowSize } from 'lib/useWindowSize'
import { JSONDisplayer } from 'lib/utils/JSONDisplayer'

import rootStore from 'state/singletons'

const UserDetail = () => {
    const store = useStore()
    const userStore = store.rootStore.users
    const headerStore = store.rootStore.header
    const routerStore = store.rootStore.router
    const classes = useStyles()
    const { id } = useParams()
    const { width } = useWindowSize()
    const [springboardData, setSpringboardData] = useState({})
    const [stylist, setStylist] = useState()
    useEffect(() => {
        Meteor.call('user.get', id, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
                setSpringboardData(res)
            }
        })
        Meteor.call('stylist.get', id, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                setStylist(res)
            }
        })
    }, [])

    const syncUser = () => {
        // isnt hooked up
        Meteor.call('user.sync', id, (err, res) => {
            if (err) {
                console.log(err)
            }
        })
    }

    return useObserver(() => (
        <div className={classes.container}>
            {width > 960 && (
                <AppBar elevation={1} position="relative" color="none" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.flex}>
                            <div className={classes.flexBetween}>
                                <div className={`${classes.flex} ${classes.eightyWidth}`}>
                                    {headerStore.displayTitle}
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>)}
            <List className={classes.list}>
                <ListItem divider>
                    <ListItemText
                        primary={
                            <span className={classes.bodyText}>
                                {userStore.selectedUser ?.phone}
                            </span>
                        }
                        secondary="PHONE NUMBER" />
                </ListItem>
                <ListItem divider>
                    <ListItemText
                        primary={
                            <span className={classes.bodyText}>
                                {userStore.selectedUser ?.email}
                            </span>
                        }
                        secondary="EMAIL" />
                </ListItem>
                {userStore.selectedUser ?.isCustomer && (
                    <Fragment>
                        <ListItem divider button onClick={() => routerStore.push('/wish-list/' + userStore.selectedId)}>
                            <ListItemText
                                primary={
                                    <span className={classes.bodyText}>
                                        View WishList
                                    </span>
                                } />
                            <KeyboardArrowRight />
                        </ListItem>
                        <ListItem divider button onClick={() => routerStore.push('/stylist-picks/' + userStore.selectedId)}>
                            <ListItemText
                                primary={
                                    <span className={classes.bodyText}>
                                        View Stylist Picks
                                    </span>
                                } />
                            <KeyboardArrowRight />
                        </ListItem>
                        <ListItem divider>
                            <ListItemAvatar>
                                <Avatar>
                                    <img src={stylist ?.profile.picture} alt="" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    stylist ? (<span className={classes.bodyText} >
                                        {stylist ?.profile.firstName + ' ' + stylist ?.profile.lastName}
                                    </span>) : 'Not found'
                                }
                                secondary="STYLIST" />
                            <ListItemIcon>
                                {springboardData.custom ? springboardData.custom ?.salesperson ?.toLowerCase() == stylist ?.profile.firstName.toLowerCase() + ' ' + stylist ?.profile.lastName.toLowerCase() ?
                                    <Check className={classes.checkIcon} /> :
                                    <Close /> : null}
                            </ListItemIcon>
                        </ListItem>
                    </Fragment>
                )}
                <ListItem divider>
                    <ListItemText
                        primary={
                            <span className={classes.bodyText}>
                                {userStore.selectedUser ?.springboardNum ? (
                                    '#' + userStore.selectedUser ?.springboardNum
                                ) : (
                                    'N/A'
                                )}
                            </span>
                        }
                        secondary="SPRINGBOARD ID" />
                    <Button variant="outlined" onClick={syncUser} disabled>
                        Sync
                    </Button>
                </ListItem>
                <ListItem divider button>
                    <ListItemText
                        primary={
                            <span className={classes.bodyText}>
                                {userStore.selectedUser ?.roleDisplay}
                            </span>
                        } secondary="ROLE" />
                    <KeyboardArrowRight />
                </ListItem>
            </List>
            <Typography className={classes.jsonLabel}>Springboard JSON Data:</Typography>
            <div style={{ width: 'calc(100vw + 20px)', overflow: 'scroll', marginLeft: -20 }}>
                <JSONDisplayer>{springboardData}</JSONDisplayer>
            </div>
        </div>
    ))
}

const selectUserById = props => rootStore.users.setSelectedId(props.match.params.id)

export default withSubscribe('users', selectUserById)(UserDetail)

const useStyles = makeStyles(theme => ({
    name: { fontWeight: 'bold', marginBottom: 10 },
    bodyText: { fontSize: '.9em', wordWrap: 'break-word' },
    list: { height: '100%', overflowY: 'scroll' },
    cta: { backgroundColor: theme.palette.secondary.main, color: 'white', marginTop: 10 },
    checkIcon: { marginLeft: 20, color: 'green' },
    closeIcon: { marginLeft: 20, color: 'red' },
    expanderItem: { padding: 0 },
    jsonExpander: { width: '100vw' },
    jsonLabel: { paddingLeft: 10 },
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
}))
