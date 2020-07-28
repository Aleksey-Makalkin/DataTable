import React from 'react'


import './ChoiceDate.css'


const ChoiceDate = ({onChoiceSmall, onChoiceBig}) => {
    return (
        <div className='ChoiceDate'>
            <p>          
                Select the amount of data to download
            </p>

            <input type='button' value='small'
            onClick = { onChoiceSmall } />

            <input type='button' value='big'
            onClick = { onChoiceBig } />
        </div>
    )
}


export default ChoiceDate