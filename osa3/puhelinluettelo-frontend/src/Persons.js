import React from 'react'

const Persons = ({ persons, deletePerson}) => {

    return (
        <>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name} {person.number} 
                    <button onClick={() => deletePerson(person)}>delete</button>
                </li>
            )}
        </>
    )
}

export default Persons