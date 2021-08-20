import React, { useState, useEffect } from 'react'
import AddPersonForm from './AddPersonForm'
import Filter from './Filter'
import Numbers from './Numbers'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBar, setFilterBar] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

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
    
    //checks empty fields
    if(newName.length === 0 || newNumber.length === 0) {
      console.log('empty name, sending alert')
      window.alert('your contact is missing either a name or a number')
    }
    //checks duplicate names or numbers
    else if(persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber)){
      console.log('duplicate name, sending alert')
      window.alert(`A person called ${newName} or the number ${newNumber} is already in your phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
        //is and should rather be handled by server, id bugs with deletions and needs a fix
        //id: persons.length+1
      }
      console.log('nameObject: ', nameObject)

      /*
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      */
      
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteName = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove id: ${event.target.id} ?`)){
      console.log('deleting name: ', event.target.id)
      personService
      .removeName(event.target.id)
      .then(response => {
        console.log('event.target.id: ', event.target.id, 'response: ', response)
        console.log('persons return filter: ', persons.filter(persons => persons.id != event.target.id))
        setPersons(persons.filter(person => person.id != event.target.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm onSubmit={addName} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange}/>
      <Filter value={filterBar} onChange={handleFilterBar}/>
      <Numbers persons={persons} filterBar={filterBar} onClick={deleteName} />
    </div>
  )
}

export default App