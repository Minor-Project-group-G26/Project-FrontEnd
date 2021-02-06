import React from 'react'
import {useParams} from 'react-router-dom'

function Testing(props) {
    const {id} = useParams()
    console.log(id);
    return (
        <div>
            {id}
        </div>
    )
}

export default Testing
