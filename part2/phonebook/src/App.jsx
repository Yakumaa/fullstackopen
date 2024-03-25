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

const Person = ({person, removePhonebook}) => {
  // const { person, index } = props
  // console.log(person)

  return (
    <>
      {person.name} {person.number}
      <button onClick={removePhonebook}>delete</button><br/>
    </>
    
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
    // if(checkPhonebook()){
    //   return  
    // }
    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)
    // console.log(existingPerson)
    if(existingPerson){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmUpdate){
        phoneServices
          .update(existingPerson.id, phonebookObject)
          .then(returnedPerson => {
            // console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Changed '${returnedPerson.name}''s number to ${returnedPerson.number}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000);
          })
          // .catch(success => {
          //   setSuccessMessage(
          //     `Added '${persons.name}' to phonebook`
          //   )
          //   setTimeout(() => {
          //     setSuccessMessage(null)
          //   }, 5000)
          // })
      }
    }else{
      phoneServices
        .create(phonebookObject)
        .then(returnedPerson => {
          // console.log('promise fulfilled')
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added '${returnedPerson.name}' to phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
        })
        // .catch(success => {
        //   setSuccessMessage(
        //     `Added '${returnedPerson.name}' to phonebook`
        //   )
        //   setTimeout(() => {
        //     setSuccessMessage(null)
        //   }, 5000)
        // })
    }
  }

  const removePhonebookOf = (id) => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name} ?`)){
      phoneServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handlePhonebookNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhonebookNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // const checkPhonebook = () => {
  //   if (persons.find(person => person.name === newName)) {
  //     alert(`${newName} is already added to phonebook`)
  //     return true
  //   }
  // }

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
      <Notification message={successMessage}/>

      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>

      <h2>add a new</h2>
      <PersonForm addPhonebook={addPhonebook} newName={newName} handlePhonebookNameChange={handlePhonebookNameChange} newNumber={newNumber} handlePhonebookNumberChange={handlePhonebookNumberChange}/>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person 
          key={person.id} 
          person={person}
          removePhonebook={() => removePhonebookOf(person.id)}
          />
      ))}
      
    </div>
    
  )
}

export default App