import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        if (!event.target.anecdote.value) return
        console.log('create anecdote', event.target.anecdote.value)
        dispatch(createNew(event.target.anecdote.value))
        event.target.anecdote.value = ""
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={createAnecdote} >
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
    </>)
}

export default AnecdoteForm