import React from 'react'

const Warning = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="warning">
            {message}
        </div>
    )
}

export default Warning