import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useStore } from 'state'

const withSubscribe = (store, callback = null) => Component => {
    const Subscribe = props => {
        const { subscriptionStore } = useStore()
        const subscription = subscriptionStore[store]

        useEffect(() => {
            // the callback needs to happen first or the selectedId will not be setup for the subscription
            callback && callback(props)
            setTimeout(() => subscription.subscribe(), 0)
            return () => subscription.unsubscribe()
        }, [])

        if (subscription.loading) {
            return <div>Loading...</div>
        }

        return <Component {...props} />
    }
    return withRouter(observer(Subscribe))
}

export default withSubscribe
