import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat(phonebookObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePhonebookNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    // setNewNumber(event.target.value)
  }
  const handlePhonebookNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const checkPhonebook = () => {
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return true
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input/>
        </div>
      </form>

      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
      ))}
      
      <div>debug: {newName} {newNumber}</div>
    </div>
    
  )
}

export default App