import React, { createContext, useContext } from 'react'

const StoreContext = createContext()

const StoreProvider = ({ initialData, children }) => {
    return <StoreContext.Provider value={initialData}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)

export default StoreProvider
