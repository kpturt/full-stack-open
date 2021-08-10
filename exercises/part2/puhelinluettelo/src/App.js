import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('a new name')

  /*renders to console what is written, sets the written name as a newName*/
  const handleNameChange = (event) => {
    //console.log('handling name change: ', event.target.value)
    setNewName(event.target.value)
  }

  /*adds the new name to the persons list*/
  const addName = (event) => {
    event.preventDefault() //prevents the page from reloading after adding name
    console.log('adding new name: ', newName)

    if(persons.some(person => person.name === newName)){
      console.log('duplicate name, sending alert')
      window.alert(`${newName} is already in your phonebook`)
    } else {
      const nameObject = {
        name: newName,
        id: persons.length+1
      }
      console.log('nameObject: ', nameObject)
      setPersons(persons.concat(nameObject))
      setNewName('')
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
          <button type="submit">add</button>
        </div>

      </form>
      {/*<p>debug: {newName}</p>*/}
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )

}

export default App