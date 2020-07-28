import React from 'react'


import TableItem from '../TableItem/TableItem'


import './TableList.css'


const TableList = ({date, onItemClick}) => {

    const tableItem = date.map((el) => {
        return (
            <li key = { el.createdId }>
                <TableItem id = { el.id } 
                firstName = { el.firstName } 
                lastName = { el.lastName } 
                email = { el.email }
                phone = { el.phone }
                address = { el.address }
                description = { el.description }
                isShow = { el.isShow }
                
                onItemClick = { () => onItemClick(el.createdId) } />
            </li>
        )
    })

    return (
        <ul className='TableList'>
            { tableItem }
        </ul>
    )
}


export default TableList