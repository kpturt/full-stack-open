import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Uljas', number: '0400-123-322', id: 1 },
    { name: 'Heijo Alias', number: '0400-345-643', id: 2 },
    { name: 'Urpo Helias', number: '0400-456-423', id: 3 },
    { name: 'Alpo Aunas', number: '0400-445-333', id: 4 },
    { name: 'Alpi Alias', number: '0400-335-345', id: 5 }
  ]) 
  const [newName, setNewName ] = useState('a new name')
  const [newNumber, setNewNumber] = useState('a new number')
  const [filterBar, setFilterBar] = useState('')

  /*need to come up with a solution for a better search*/
  const numbersToShow = persons.filter(person => person.name.toLowerCase().indexOf(filterBar) === 0 || person.name.toUpperCase().indexOf(filterBar) === 0 || person.name.indexOf(filterBar) === 0)

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
      window.alert(`${newName} is already in your phonebook`)
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

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>
        search contacts: <input value={filterBar} onChange={handleFilterBar}></input>
      </div>
      
      <h2>Numbers</h2>
      <ul>
        {numbersToShow.map(person => <li key={person.id}> {person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App