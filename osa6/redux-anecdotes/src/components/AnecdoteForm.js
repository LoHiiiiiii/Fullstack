import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        if (!event.target.anecdote.value) return
        console.log('create anecdote', event.target.anecdote.value)
        dispatch(createAnecdote(event.target.anecdote.value))

        const notification = `created anecdote "${event.target.anecdote.value}"`
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(hideNotification(notification))
        }, 5000)
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

export default AnecdoteForm