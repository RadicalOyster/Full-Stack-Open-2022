import { useState, useEffect } from 'react'
import InputField from './components/InputField'
import NumbersList from './components/NumbersList'
import PersonService from './services/persons'
import Notification from './components/Notification'
import './App.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

  //Return if name is blank
  const addEntry = (event) => {
    event.preventDefault()
    if (newName === "") {
      alert("Name cannot be blank.")
      return
    }

    //Return if number is blank
    if (newNumber === "") {
      setErrorMessage("Number cannot be blank")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    //Ask user if they want to update person if name is already
    //in phonebook 
    const newPerson = { name: newName, number: newNumber }
    var person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already in the phonebook. Update phone number?`)) {
        PersonService.update(person.id, newPerson)
          .then(response => {
            PersonService.getAll().then(response => {
              setPersons(response.data)
              setFiltered(response.data)
              setNewName('')
              setNewNumber('')
              setNameFilter('')
              setNotification(`Updated the number for ${newName} in the phonebook.`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
          }).catch(error => {
            setErrorMessage(
              `The number for '${newName}' could not be found on the server.`
            )
            setPersons(persons.filter(person => person.name !== newName))
            setFiltered(filtered.filter(person => person.name !== newName))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }

    //Else add new person to phonebook
    let personsList = [...persons]
    PersonService.create(newPerson)
      .then(response => {
        personsList.push(response.data)
        setNewName('')
        setNewNumber('')
        setNameFilter('')
        setPersons(personsList)
        setFiltered(personsList)
        setNotification(`Added the number for ${newName} to the phonebook.`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    let number = event.target.value.replaceAll('-', '')
    if (isNaN(number)) {
      return
    }
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNameFilter(event.target.value)
    if (event.value === '') {
      return
    }
    let personsList = [...persons]
    personsList = personsList.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFiltered(personsList)
  }

  const confirmDelete = (event) => {
    event.preventDefault()

    if (window.confirm(`Delete ${event.target.dataset.name} from the phonebook?`)) {
      PersonService.deleteNumber(event.target.value)
        .then(response => {
          setPersons(persons.filter(person => person.name !== event.target.dataset.name))
          setFiltered(filtered.filter(person => person.name !== event.target.dataset.name))
          setNotification("Deleted entry from the phonebook.")
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage(
            `The number for '${event.target.dataset.name}' was already deleted from server`
          )
          setPersons(persons.filter(person => person.name !== event.target.dataset.name))
          setFiltered(filtered.filter(person => person.name !== event.target.dataset.name))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} isError={false} />
      <Notification message={errorMessage} isError={true} />
      <InputField title={"Filter by name"} value={nameFilter} handler={handleFilterChange} />
      <h2>Add new number</h2>
      <form onSubmit={addEntry}>
        <InputField title={'Name'} value={newName} handler={handleNameChange} />
        <InputField title={'Number'} value={newNumber} handler={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <NumbersList list={filtered} clickHandler={confirmDelete} />
    </div>
  )

}

export default App