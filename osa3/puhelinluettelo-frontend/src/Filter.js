import React from 'react'

const Filter = ({ filter, filterChange }) => {
    return (
        <form>
            <div>filter shown with <input value={filter} onChange={filterChange} /></div>
        </form>
    )
}

export default Filter