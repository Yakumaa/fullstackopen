import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneServices from './services/phonebook'

const Filter = (props) => {
  const { searchName, handleSearchNameChange } = props
  // console.log(props)

  return (
    <form>
      <div>
        filter shown with <input value={searchName} onChange={handleSearchNameChange}/>
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  const { addPhonebook, newName, handlePhonebookNameChange, newNumber, handlePhonebookNumberChange } = props
  // console.log(props)

  return (
    <form onSubmit={addPhonebook}>
      <div>
        name: <input value={newName} onChange={handlePhonebookNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handlePhonebookNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  const { person, index } = props
  // console.log(props)

  return (
    <p key={index}>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    phoneServices
      .getAll()
      .then(initialPerson => {
        // console.log('promise fulfilled')
        setPersons(initialPerson)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

  const addPhonebook = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if(checkPhonebook()){
      return  
    }
    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    phoneServices
      .create(phonebookObject)
      .then(returnedPerson => {
        // console.log('promise fulfilled')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    // setPersons(persons.concat(phonebookObject))
    // setNewName('')
    // setNewNumber('')
  }

  const handlePhonebookNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhonebookNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const checkPhonebook = () => {
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return true
    }
  }

  const handleSearchNameChange = (event) => {
    // console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>

      <h2>add a new</h2>
      <PersonForm addPhonebook={addPhonebook} newName={newName} handlePhonebookNameChange={handlePhonebookNameChange} newNumber={newNumber} handlePhonebookNumberChange={handlePhonebookNumberChange}/>
      <h2>Numbers</h2>
      {filteredPersons.map((person, index) => (
        <Person key={index} person={person}/>
      ))}
      
    </div>
    
  )
}

export default App