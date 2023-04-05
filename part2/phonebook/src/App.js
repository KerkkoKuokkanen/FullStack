import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Persons = ({addName, handleNames, handleNumbers, newName, newNumber}) => (
  <form onSubmit={addName}>
    <div> {"name: "}
      <input
        value={newName}
        onChange={handleNames}
      /> <br /> {"number: "}
      <input
        value={newNumber}
        onChange={handleNumbers}
      /> <br />
      <button type="submit">add</button>
    </div>
  </form>
)

const NameAndDelete = ({person, persons, setPersons}) => {

  const win = () => {
    if (window.confirm(`Delete ${person.name}?`))
    {
      personService.clear(person.id)
      .then(response => setPersons(persons.filter(per => per.id !== person.id)))
    }
  }
  return (
  <div>
    {person.name} {person.number + " "}
    <button type="button" onClick={() => win()}>delete</button>
  </div>
  )
}

const RenderPeople = ({people, persons, setPersons}) => {
  return (
    <div>
      {people.map(person =>
        <NameAndDelete key={person.id} person={person} persons={persons} setPersons={setPersons}/>
      )}
    </div>
  )
}

const Filter = ({filter, handleFilter}) => (
  <div>
    {'filter shown with '}
    <input
      value={filter}
      onChange={handleFilter}
    />
  </div>
)

const Notification = ({message}) => {
  if (message == null) return null

  if (message.includes('has already been removed from the server'))
  {
    return (
      <div className='error'>{message}</div>
    )
  }

  return (
    <div className='message'>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => { setPersons(response.data) })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => JSON.stringify(person.name) === JSON.stringify(newName)))
    {
      if (window.confirm(newName + ' is already in the phonebook. Do you want to replace the old one?'))
      {
        const replaced = persons.find(person => JSON.stringify(person.name) === JSON.stringify(newName))
        personService.update(replaced.id, {...replaced, number: newNumber})
        .then(responce => setPersons(  
          persons.map(person => person.id !== responce.data.id ? person : responce.data)
        )).catch(error => {
          setMessage(`Information of ${newName} has already been removed from the server.`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        setMessage('Changed ' + newName)
        setTimeout(() => {setMessage(null)}, 5000)
        setNewName('')
        setNewNumber('')
      }
      return
    }
    personService.create({name: newName, number: newNumber})
    .then(response => {setPersons(persons.concat(response.data))})
    setMessage('Added ' + newName)
    setTimeout(() => {setMessage(null)}, 5000)
    setNewName('')
    setNewNumber('')
  }

  const handleNames = (event) => {setNewName(event.target.value)}
  const handleNumbers = (event) => {setNewNumber(event.target.value)}
  const handleFilter = (event) => {setFilter(event.target.value)}

  const searchFilter = () => {
    const filteredName = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
    return (filteredName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <Persons addName={addName} handleNames={handleNames} handleNumbers={handleNumbers}
        newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <RenderPeople people={searchFilter()} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App