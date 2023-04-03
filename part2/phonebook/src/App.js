import { useState } from 'react'

const Names = ({name, number}) => (
  <div>{name} {number}</div>
)

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

const RenderPeople = ({people}) => {
  return (
    <div>
      {people.map(person => 
        <Names key={person.name} name={person.name} number={person.number} />
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => JSON.stringify(person.name) === JSON.stringify(newName)))
      alert(newName +' is already added to the phonebook')
    else
    {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName('');
      setNewNumber('')
    }
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
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <Persons addName={addName} handleNames={handleNames} handleNumbers={handleNumbers}
        newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <RenderPeople people={searchFilter()} />
    </div>
  )
}

export default App