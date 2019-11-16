import React from 'react'

const getJsonIndented = (obj) => JSON.stringify(obj, null, 4).replace(/["{[,\}\]]/g, '')

export const JSONDisplayer = ({ children }) => (
    <div style={{ letterSpacing: 0 }}>
        <pre>{getJsonIndented(children)}</pre>
    </div>
)
