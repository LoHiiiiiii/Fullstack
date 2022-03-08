import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const createNew = (event) => {
        event.preventDefault()
        if (!event.target.anecdote.value) return
        console.log('create anecdote', event.target.anecdote.value)
        props.createAnecdote(event.target.anecdote.value)
        props.showNotification(
            `created anecdote "${event.target.anecdote.value}"`,
            5000
        )
        event.target.anecdote.value = ""
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={createNew} >
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
    </>)
}

const mapDispatchToProps = {
    createAnecdote,
    showNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm