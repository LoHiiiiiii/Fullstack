import { useState } from 'react'
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import Persons from "./Persons"

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [filter, setFilter] = useState('')
    const [personsToShow, setPersonsToShow] = useState(persons)

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        updatePersonsToShow(event.target.value, persons)
    }

    const updatePersonsToShow = (filter, persons) => {
        const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        setPersonsToShow(filtered)
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
        } else {

            const newPerson = {
                name: newName,
                number: newNumber
            }

            const newPersons = persons.concat(newPerson)

            setPersons(newPersons)
            updatePersonsToShow(filter, newPersons)
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} filterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm newName={newName} nameChange={handleNameChange} newNumber={newNumber} numberChange={handleNumberChange} submit={addPerson} />
            <h3>Numbers</h3>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App