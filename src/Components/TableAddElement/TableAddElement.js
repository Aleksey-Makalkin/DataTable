import React from 'react'


import './TableAddElement.css'


const TableAddElement = ({onAddElement, addShow, onAddFormChange, isAddtrue, onAddButtonClick, formValue}) => {

    let style = 'TableAddElementForm'
    if (addShow)
        style += ' TableAddFormShow'
    
    const arrayElement = ['id', 'firstName', 'lastName', 'email', 'phone']
    const targetArrayElement = arrayElement.map((el) => {
        return (
            <div key = { el + ' form' }>
                <p>{ el }</p>
                <input placeholder='Ввод' value = { formValue[el] }
                onChange = { (event) => onAddFormChange(event, el) } />
            </div>
        )
    })

    let styleAdd = 'none'
    if (isAddtrue)
        styleAdd = 'addActive'

    return (
        <div className='TableAddElement'>
            <input type='button' value='Add'
            onClick = { onAddElement } />

            <form className = { style }>

                { targetArrayElement }

                <div>
                    <p>description</p>
                    <textarea placeholder='Ввод' value = { formValue.description }
                    onChange = { (event) => onAddFormChange(event, 'description') } ></textarea>
                </div>

                <div>
                    <input type='button' value='Add to table' id = { styleAdd }
                    onClick = { onAddButtonClick } />
                </div>

            </form>

            </div>
    )
}


export default TableAddElement