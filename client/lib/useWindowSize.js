import { useEffect, useState } from 'react'

export const useWindowSize = () => {
    const [state, setState] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        const handler = () =>
            setState({
                height: window.innerHeight,
                width: window.innerWidth
            })
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return state
}
