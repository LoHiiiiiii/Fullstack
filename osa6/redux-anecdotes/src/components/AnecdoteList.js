import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (!state.filter) return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = (id, content, votes) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        const notification = `"${content}" now has ${votes + 1} ${votes === 0 ? "vote" : "votes"}`
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(hideNotification(notification))
        }, 5000)
    }

    return (<>
        {
            anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                    </div>
                </div>
            )
        }
    </>)
}

export default AnecdoteList