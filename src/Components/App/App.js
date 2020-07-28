import React, { Component } from 'react'


import ChoiceDate from '../ChoiceDate/ChoiceDate'
import LoadWindow from '../LoadWindow/LoadWindow'

import TableList from '../TableList/TableList'
import TableNumberList from '../TableNumberList/TableNumberList'
import TableAddElement from '../TableAddElement/TableAddElement'
import TableHeader from '../TableHeader/TableHeader'
import TableSearch from '../TableSearch/TableSearch'


import './App.css'


export default class App extends Component {

    state = {

        listActive: 'choice',

        date: [],
        
        isNumberList: 1,

        isSort: 'idAscending',

        addShow: false,

        idForm: '',
        firstNameForm: '',
        lastNameForm: '',
        emailForm: '',
        phoneForm: '',
        descriptionForm: '',

        searchText: ''

    }

    constructor() {
        super()
        this.serverConnect = (targetUrl) => {
            const xhr = new XMLHttpRequest()

            xhr.open('GET', targetUrl)

            xhr.onload = () => {
                if (xhr.status >= 400)
                    alert(`ERROR, please reload site. 
                    \nОшибка. Возможные решения:
                    \n - проверьте подключение к интернету
                    \n - перезагрузите страницу
                    \n * Возможна ошибка в работе сайта базы данных, попробуйте позже`)
                else {
                    const response = JSON.parse(xhr.response)
                    for (let i = 0; i < response.length; i++) {
                        response[i].isShow = false
                        response[i].createdId = i + 1
                    }
                    this.setState({
                        date: response,
                        listActive: 'table'
                    })
                }
            }

            xhr.onerror = () => {
                alert(`ERROR, please reload site. 
                    \nОшибка. Возможные решения:
                    \n - проверьте подключение к интернету
                    \n - перезагрузите страницу
                    \n * Возможна ошибка в работе сайта базы данных, попробуйте позже`)
            }

            xhr.send()
        }
    }

    onItemClick = (createdId) => {
        this.setState((state) => {
            const newDate = [...state.date]
            const targetIndex = newDate.findIndex((el) => el.createdId === createdId)
            newDate[targetIndex].isShow = !newDate[targetIndex].isShow
            return {
                date: newDate
            }
        })
    }

    onNumberListClick = (numberList) => {
        window.scrollTo(0, 0)
        this.setState({
            isNumberList: numberList
        })
    }

    onColumnCLick = (columnName) => {
        const {isSort} = this.state

        const sortSetFunction = (name) => {
            if (columnName === name) {
                if (isSort === name + 'Ascending')
                    this.setState(() => {
                        return {
                            isSort: name + 'Descending'
                        }
                    })
                else
                    this.setState(() => {
                        return {
                            isSort: name + 'Ascending'
                        }
                    })
            }
        }
        sortSetFunction('id')
        sortSetFunction('firstName')
        sortSetFunction('lastName')
        sortSetFunction('email')
        sortSetFunction('phone')
    }

    onAddElement = () => {
        this.setState((state) => {
            return {
                addShow: !state.addShow
            }
        })
    }

    onAddFormChange = (event, el) => {
        if (el === 'id')
            this.setState({
                idForm: event.target.value
            })
        else if (el === 'firstName')
            this.setState({
                firstNameForm: event.target.value
            })
        else if (el === 'lastName')
            this.setState({
                lastNameForm: event.target.value
            })
        else if (el === 'email')
            this.setState({
                emailForm: event.target.value
            })
        else if (el === 'phone')
            this.setState({
                phoneForm: event.target.value
            })
        else if (el === 'description')
            this.setState({
                descriptionForm: event.target.value
            })
    }


    onAddButtonClick = () => {
        this.setState((state) => {
            const newDate = [...state.date]

            const { idForm, firstNameForm, lastNameForm,
            emailForm, phoneForm, descriptionForm } = state

            if (idForm.length > 0 && firstNameForm.length > 0 && lastNameForm.length > 0 &&
                emailForm.length > 0 && phoneForm.length > 0 && descriptionForm.length > 0)
                newDate.unshift({
                    id: idForm,
                    firstName: firstNameForm,
                    lastName: lastNameForm,
                    email: emailForm,
                    phone: phoneForm,
                    address: {
                        streetAddress: 'confidentially',
                        city: 'confidentially',
                        state: 'confidentially',
                        zip: 'confidentially'
                    },
                    description: descriptionForm,
                    isShow: false,
                    createdId: parseInt(state.date[0].createdId) - 10
                })
                return {
                    date: newDate,
                    idForm: '',
                    firstNameForm: '',
                    lastNameForm: '',
                    emailForm: '',
                    phoneForm: '',
                    descriptionForm: ''
                }
        })
    }

    onSearchChange = (event) => {
        this.setState({
            searchText: event.target.value,
            isNumberList: 1
        })
    }

    onChoiceSmall = () => {
        this.setState({
            listActive: 'load'
        })
        this.serverConnect('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
    }

    onChoiceBig = () => {
        this.setState({
            listActive: 'load'
        })
        this.serverConnect('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
    }



    render() {
        const isNumberPerson = this.state.date.length

        const {listActive, isNumberList, isSort, date, addShow,
            idForm, firstNameForm, lastNameForm, emailForm, phoneForm, descriptionForm,
            searchText} = this.state


        let targetDate = [...date]

        if (searchText.length > 0) {
            targetDate = targetDate.filter((el) => {
                if (el.id.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || 
                el.firstName.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || 
                el.lastName.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || 
                el.email.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
                el.phone.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
                    return true
                else return false
            })
        }


        if (isSort === 'idAscending')
            targetDate.sort((a, b) => a.id - b.id)
        if (isSort === 'idDescending')
            targetDate.sort((a, b) => b.id - a.id)

        const sortFunction = (name) => {
            if (isSort === name + 'Ascending')
            targetDate.sort((a, b) => {
                if (a[name].toLowerCase() < b[name].toLowerCase())
                return -1
                else if (a[name].toLowerCase() > b[name].toLowerCase())
                return 1
                else return 0
            })
        if (isSort === name + 'Descending')
            targetDate.sort((a, b) => {
                if (a[name].toLowerCase() < b[name].toLowerCase())
                return 1
                else if (a[name].toLowerCase() > b[name].toLowerCase())
                return -1
                else return 0
            })
        }

        sortFunction('firstName')
        sortFunction('lastName')
        sortFunction('email')

        if (isSort === 'phoneAscending')
            targetDate.sort((a, b) => parseInt(a.phone[1] + a.phone[2] + a.phone[3]) - parseInt(b.phone[1] + b.phone[2] + b.phone[3]))
        if (isSort === 'phoneDescending')
            targetDate.sort((a, b) => parseInt(b.phone[1] + b.phone[2] + b.phone[3]) - parseInt(a.phone[1] + a.phone[2] + a.phone[3]))


        targetDate = targetDate.slice((isNumberList - 1) * 10, isNumberList * 10)
        
        let isAddtrue = false
        if (idForm.length > 0 && firstNameForm.length > 0 && lastNameForm.length > 0 &&
            emailForm.length > 0 && phoneForm.length > 0 && descriptionForm.length > 0)
            isAddtrue = true





            if (listActive === 'choice')
                return (
                    <ChoiceDate onChoiceSmall = { this.onChoiceSmall }
                    onChoiceBig = { this.onChoiceBig } />
                )

            else if (listActive === 'load')
                return (
                    <LoadWindow />
                )

            else if (listActive === 'table') 
                return (
                    <div className='App'>

                        <TableAddElement onAddElement = { this.onAddElement }
                        addShow = { addShow }
                        onAddFormChange = { this.onAddFormChange }
                        isAddtrue = { isAddtrue }
                        onAddButtonClick = { this.onAddButtonClick }
                        formValue = { {id: idForm, firstName: firstNameForm, lastName: lastNameForm, 
                        email: emailForm, phone: phoneForm, description: descriptionForm} } />

                        <TableSearch onSearchChange = { this.onSearchChange }
                        addShow = { addShow } />

                        <TableHeader onColumnCLick = { this.onColumnCLick }
                        isSort = { isSort } />

                        <TableList date = { targetDate }
                        onItemClick = { this.onItemClick } />

                        <TableNumberList isNumberPerson = { isNumberPerson }
                        onNumberListClick = { this.onNumberListClick }
                        isNumberList = { isNumberList } />

                    </div>
            )

    }
}


