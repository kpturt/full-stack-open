import React from 'react'

const Filter = (props) => {
    return (
        <div>
            search contacts: <input value={props.value} onChange={props.onChange}></input>
        </div>
    )
}

export default Filter