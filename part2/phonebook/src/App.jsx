import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const messageTimer = 3000

  useEffect(() => {
    personsService.getAll().then(data => setPersons(data)) // Get initial persons from DB
    console.log(persons)
  }, [])

  const handleChange = (func) => (event) => {
    func(event.target.value)
  }  

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {

        const id = persons.find(person => person.name === newName).id

        personsService.update(id, newPersonObject).then(() => {
          personsService.getAll().then(data => setPersons(data))
          setMessage(`Updated ${newName}`)
          setTimeout(() => setMessage(null), messageTimer)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), messageTimer)
        })

      } 
    } else {
      personsService.create(newPersonObject).then(() => {
        personsService.getAll().then(data => setPersons(data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() => setMessage(null), messageTimer)
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), messageTimer)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {
        message &&
        <Notification message={message} />
      }

      {
        errorMessage &&
        <Notification message={errorMessage} error={true} />
      }

      <div>
        <Filter searchName={searchName} setSearchName={setSearchName} handleChange={handleChange} />
      </div>

      <div>
        <h3>Add a new</h3>
        <PersonsForm handleSubmit={handleSubmit} handleChange={handleChange}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNewNumber={setNewNumber}
        />
      </div>
      
      <div>
        <h3>Numbers</h3>
        <Persons persons={persons} searchName={searchName} setPersons={setPersons} />
      </div>
    </div>
  )
}

export default App