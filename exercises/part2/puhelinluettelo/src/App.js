import React, { useState, useEffect } from 'react'
import AddPersonForm from './AddPersonForm'
import Filter from './Filter'
import Numbers from './Numbers'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBar, setFilterBar] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const Notification = ({message}) => {
    if(message === null){
      return null
    }
    return(
      <div className="error">
        {message}
      </div>
    )
  }

  /*renders to console what is written, sets the written name as a new value for the variable*/
  const handleNameChange = (event) => {
    //console.log('handling name change: ', event.target.value) //writes search bar to console
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterBar = (event) => {
    setFilterBar(event.target.value)
  }

  /*adds the new name to the persons list*/
  const addName = (event) => {
    event.preventDefault() //prevents the page from reloading after adding name
    console.log('adding new name: ', newName, 'number: ', newNumber)
    const nameObject = {
      name: newName,
      number: newNumber
      //is and should rather be handled by server, id bugs with deletions and needs a fix
      //id: persons.length+1
    }
    
    //checks empty fields
    if(newName.length === 0 || newNumber.length === 0) {
      console.log('empty name, sending alert')
      window.alert('your contact is missing either a name or a number')
    }
    /**
     * checks duplicate names
     * duplicate numbers: || persons.some(person => person.number === newNumber)
     * duplicate numbers creates a bug with oldID
     */
    else if(persons.some(person => person.name === newName)){
      console.log('duplicate name, sending alert')
      if(window.confirm(`A person called ${newName} or the number ${newNumber} is already in your phonebook. Do you want to replace this person's number?`)){
        const oldID = persons.find(person => person.name === newName).id
        console.log('oldID: ', oldID)
        personService
        .update(nameObject, oldID)
        .then(response => {
          setPersons(persons.map(person => person.id !== oldID ? person : response))
          setNewName('')
          setNewNumber('')
          //notification
          setNotificationMessage(
            `${nameObject.name}'s number changed in phonebook.`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
    }
    else {
      console.log('nameObject: ', nameObject)
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          //notification
          setNotificationMessage(
            `${nameObject.name} added to phonebook.`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const deleteName = (event) => {
    event.preventDefault()
    console.log('deleting name')
    console.log('event id: ', event.target.id)
    console.log('person id: ', persons.find(person => person.id == event.target.id).id)
    const namm = {
      name: persons.find(person => person.id == event.target.id).name,
      number: persons.find(person => person.id == event.target.id).number,
      id: persons.find(person => person.id == event.target.id).id
    }
    console.log('NAMM', namm)
    if(window.confirm(`Remove id: ${event.target.id} ?`)){
      console.log('deleting name: ', event.target.id)
      personService
      .removeName(event.target.id)
      .then(response => {
        console.log('event.target.id: ', event.target.id, 'response: ', response)
        console.log('persons return filter: ', persons.filter(persons => persons.id != event.target.id))
        setPersons(persons.filter(person => person.id != event.target.id))
        //notification
        setNotificationMessage(
          `${persons.find(person => person.id == event.target.id).name} deleted from phonebook.`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <AddPersonForm onSubmit={addName} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange}/>
      <Filter value={filterBar} onChange={handleFilterBar}/>
      <Numbers persons={persons} filterBar={filterBar} onClick={deleteName} />
    </div>
  )
}

export default App