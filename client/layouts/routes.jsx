// PACKAGES
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { withRouter } from 'react-router-dom'
import { Center } from 'react-layout-components'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
//STATE
import { useStore } from 'state'
import AuthStore from 'state/auth'
// LAYOUTS
import Unprotected from 'layouts/unprotected'
import Protected from 'layouts/protected'

const Routes = props => {
    const store = useStore()
    const classes = useStyles()

    useEffect(
        () => {
            store.rootStore.router.setRoute(props.location, props.history, props.match)
        },
        [JSON.stringify(props.location), JSON.stringify(props.history), JSON.stringify(props.match)]
    )

    if (AuthStore.loading) {
        return (
            <div className={classes.pageContainer}>
                <Center className={classes.center} column>
                    <Typography variant="h4">Loading...</Typography>
                    <LinearProgress color="primary" className={classes.progress} />
                </Center>
            </div>
        )
    }

    if (AuthStore.currentUser) return <Protected {...props} />

    return <Unprotected {...props} />
}

export default withRouter(observer(Routes))

const useStyles = makeStyles(theme => ({
    pageContainer: {
        width: '100vw',
        height: '100vh',
    },
    center: {
        width: '100%',
        color: 'white',
        fontSize: 35,
        fontFamily: 'sans-serif'
    },
    progress: {
        width: 500,
        maxWidth: '90vw',
        marginTop: 40,
        height: 20,
        borderRadius: 4
    }
}))
