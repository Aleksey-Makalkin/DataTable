import React from 'react'


import './TableNumberList.css'


const TableNumberList = ({isNumberPerson, onNumberListClick, isNumberList}) => {

    const numberArray = []
    for (let i = 0; i < isNumberPerson / 10; i++) {
        numberArray[i] = i + 1
    }
    const numberListArray = numberArray.map((el) => {
        return (
            <li key = { el } 
            onClick = { () => onNumberListClick(el) }>
                { el }
            </li>
        )
    })

    numberListArray[isNumberList - 1] = (
        <li key = { isNumberList } 
            onClick = { () => onNumberListClick(isNumberList) }
            id = 'activeNumberList'>
                { isNumberList }
            </li>
    )

    return (
        <ul className='TableNumberList'>
            { numberListArray }
        </ul>
    )
}


export default TableNumberList