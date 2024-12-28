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
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({ message: null, color: 'gray' })

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
     
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const personObject = { ...oldPerson, number: newNumber }
        personsService
          .update(oldPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === oldPerson.id ? updatedPerson : person))
          })
          .catch(error => {
            setErrorMessage({ message: `Information of ${oldPerson.name} has already been removed from the server`, color: 'red' })
            setTimeout(() => {
              setErrorMessage({ ...errorMessage, message: null })
            }, 5000)

          })
      }
     } else {
      const personObject = { name: newName, number: newNumber }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setErrorMessage({ message: `Added ${returnedPerson.name}`, color: 'green' })
          setTimeout(() => {
            setErrorMessage({ ...errorMessage, message: null })
          }, 5000)
        })
     }
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`))
    personsService
      .remove(id)
      .then(removedPerson => {
        setPersons(persons.filter(person => removedPerson.id !== person.id))
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage.message} color={errorMessage.color} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonsForm 
        addPerson={addPerson} 
        name={newName} 
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App