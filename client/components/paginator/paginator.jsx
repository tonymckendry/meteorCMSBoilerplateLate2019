import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Pagination from 'material-ui-flat-pagination'

import { Center } from 'react-layout-components'

import { useObserver } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles'

import { useStore } from 'state'

const Paginator = ({ subscription }) => {
    const store = useStore()
    const classes = useStyles()
    const paginationStore = store.rootStore.pagination
    const subscriptionStore = store.subscriptionStore
    // we calculate this here becuase the mobx store is not updated fast enough
    useEffect(() => {
        paginationStore.setCurrentStore(subscription)
        return paginationStore.reset
    }, [])

    return useObserver(() => {
        if (!subscriptionStore.searchLoading) {
            return (
                <Center>
                    <Pagination
                        className={classes.paginator}
                        size="large"
                        offset={paginationStore.page - 1}
                        total={paginationStore.totalPages}
                        onClick={(e, offset) => paginationStore.setPage(offset + 1)}
                    />
                </Center>
            )
        }
        return null
    })
}
export default withRouter(Paginator)

const useStyles = makeStyles(theme => ({
    paginator: { padding: '1rem' }
}))
