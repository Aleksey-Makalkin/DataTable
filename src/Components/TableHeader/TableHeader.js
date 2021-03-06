import React from 'react'


import './TableHeader.css'


const TableHeader = ({onColumnCLick, isSort}) => {
    const headerNames = ['id', 'firstName', 'lastName', 'email', 'phone']
    const headerArrow = []
    headerArrow[0] = isSort === 'idAscending' ? '⬆' : '⬇'
    headerArrow[1] = isSort === 'firstNameAscending' ? '⬆' : '⬇'
    headerArrow[2] = isSort === 'lastNameAscending' ? '⬆' : '⬇'
    headerArrow[3] = isSort === 'emailAscending' ? '⬆' : '⬇'
    headerArrow[4] = isSort === 'phoneAscending' ? '⬆' : '⬇'

    let i = 0
    const HeaderColumns = headerNames.map((el) => {
        return (
            <div key = { el }
            onClick = {() => onColumnCLick(el)} >
                { el } { headerArrow[i++] }
            </div>
        )
    })

    return (
        <div className='TableHeader'>
            { HeaderColumns }
        </div>
    )
}


export default TableHeader