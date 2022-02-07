const PersonForm = ({ newName, nameChange, newNumber, numberChange, submit }) => {
    return (
        <form onSubmit={submit}>
            <div>name: <input value={newName} onChange={nameChange} /></div>
            <div>number: <input value={newNumber} onChange={numberChange} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm