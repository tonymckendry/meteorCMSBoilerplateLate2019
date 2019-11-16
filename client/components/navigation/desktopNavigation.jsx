import React from 'react'
import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import { useStore } from 'state'

const useStyles = makeStyles(theme => ({
    container: { height: '100vh', width: 300, overflow: 'hidden', backgroundColor: 'white' },
    paper: { backgroundColor: 'white' },
    list: {
        height: '100vh',
        width: 300,
        color: 'white'
    },
    icon: {
        color: theme.palette.common.white
    },
    img: { margin: 20 },
    mobileLogo: {
        height: 45
    },
    flex: {
        display: 'flex',
        width: '80%',
        justifyContent: 'center'
    }
}))

const DesktopNavigation = ({ children }) => {
    const classes = useStyles()
    const store = useStore()
    const routerStore = store.rootStore.router
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            PaperProps={{ style: { backgroundColor: 'white' } }}>
            <div className={classes.container}>
                {children}
            </div>
        </Drawer>
    )
}

export default observer(DesktopNavigation)
