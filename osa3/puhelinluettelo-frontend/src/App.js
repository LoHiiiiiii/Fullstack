import React, { useState, useEffect } from 'react'
import personService from "./services/persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import Persons from "./Persons"

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [filter, setFilter] = useState('')
    const [personsToShow, setPersonsToShow] = useState(persons)

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        updatePersonsToShow(event.target.value, persons)
    }

    useEffect(() => {
        personService.getAll().then(returnedPersons => {
            setPersons(returnedPersons)
            updatePersonsToShow(filter, returnedPersons)
        })
    }, [])


    const updatePersonsToShow = (filter, persons) => {
        const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        setPersonsToShow(filtered)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const foundPerson = persons.find(person => person.name === newName)
        
        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (foundPerson) {
            newPerson.id = foundPerson.id
            if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
                personService.update(newPerson.id, newPerson).then(returnedPerson => {
                    const updatedPersons = persons.map(person => person.id !== newPerson.id ? person : newPerson)
                    setPersons(updatedPersons)
                    updatePersonsToShow(filter, updatedPersons)
                }).catch(error => {
                    console.log(error)
                    alert(`Couldn't update ${newName}'s number.`)
                })
            }
        } else {

            personService.create(newPerson).then(returnedPerson => {
                const newPersons = persons.concat(returnedPerson)
                setPersons(newPersons)
                updatePersonsToShow(filter, newPersons)
            }).catch(error => {
                console.log(error)
                alert(`Couldn't add ${newName} to the phonebook.`)
            })
        }
        
        setNewName('')
        setNewNumber('')
    }

    const deletePerson = (deleted) => {
        if (window.confirm(`Delete ${deleted.name}?`)) {
            personService.deletePerson(deleted.id).then(response => {
                const deletedPersons = persons.filter(person => person.id !== deleted.id)
                setPersons(deletedPersons)
                updatePersonsToShow(filter, deletedPersons)
            }).catch(error => {
                console.log(error)
                alert(`Couldn't delete ${deleted.name} from the phonebook.`)
            })
        }
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
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App