import React from 'react'

const Taskitem = ({title, description}) => {
    return (
        <div className='todo'>

            <div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Taskitem