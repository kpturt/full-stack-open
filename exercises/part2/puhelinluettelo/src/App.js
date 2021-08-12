import React, { useState } from 'react'
import AddPersonForm from './AddPersonForm'
import Filter from './Filter'
import Numbers from './Numbers'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Uljas', number: '0400-123-322', id: 1 },
    { name: 'Heijo Alias', number: '0400-345-643', id: 2 },
    { name: 'Urpo Helias', number: '0400-456-423', id: 3 },
    { name: 'Alpo Aunas', number: '0400-445-333', id: 4 },
    { name: 'Alpi Alias', number: '0400-335-345', id: 5 }
  ]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBar, setFilterBar] = useState('')

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
        number: newNumber,
        id: persons.length+1
      }
      console.log('nameObject: ', nameObject)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm onSubmit={addName} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange}/>
      <Filter value={filterBar} onChange={handleFilterBar}/>
      <Numbers persons={persons} filterBar={filterBar}/>
    </div>
  )
}

export default App