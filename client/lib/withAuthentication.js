import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'state'

import _404 from 'views/notFound/notFound'

/**
 * Returns 404 if the user is not logged in.
 */
const withAuthentication = Component => {
    const ProtectedComponent = props => {
        const { authStore } = useStore()

        if (!authStore.currentUser) {
            return <_404 />
        }

        return <Component {...props} />
    }

    return observer(ProtectedComponent)
}

export default withAuthentication
