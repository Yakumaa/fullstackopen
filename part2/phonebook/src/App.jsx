import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPhonebook = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const phonebookObject = {
      name: newName
    }
    setPersons(persons.concat(phonebookObject))
    setNewName('')
  }

  const handlePhonebookChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const checkPhonebook = () => {
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
  }

  // if (persons.find(person => person.name === newName)) {
  //   alert(`${newName} is already added to phonebook`)
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhonebook}>
        <div>
          name: <input value={newName} onChange={handlePhonebookChange}/>
        </div>
        <div>
          <button type="submit" onSubmit={checkPhonebook}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App