import React from 'react'


import './TableItem.css'


const TableItem = ({id, firstName, lastName, email, phone, address, description, isShow, onItemClick}) => {

    let styleShort = 'TableItemShortInfo'
    let styleLong = 'TableItem-isShow-false'
    if (isShow) {
        styleShort = 'TableItemShortInfo TableItemShortInfoActive'
        styleLong = 'TableItem-isShow-true'
    }

    return (
        <div className='TableItem' onClick = { onItemClick }>
            <div className={ styleShort }>
                <div>
                    { id }
                </div>
                <div>
                    { firstName }
                </div>
                <div>
                    { lastName }
                </div>
                <div>
                    { email }
                </div>
                <div>
                    { phone }
                </div>
            </div>
            <div className = { styleLong }>
                Выбран пользователь <b>{ firstName } { lastName }</b>
                <br />
                Описание: { description }
                <br />
                Адрес проживания: <b>{ address.streetAddress }</b>
                <br />
                Город: <b>{ address.city }</b>
                <br />
                Провинция/штат: <b>{ address.state }</b>
                <br />
                Индекс: <b>{ address.zip }</b>
            </div>
        </div>
    )
}


export default TableItem