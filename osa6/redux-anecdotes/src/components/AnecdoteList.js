import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const anecdotes = useSelector(state => {
        if (!state.filter) return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    console.log(anecdotes)

    const anecdoteSorter = function (a, b) {
        return b.votes - a.votes
    }

    const sortedAnecdotes = [...anecdotes].sort(anecdoteSorter)

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(showNotification(
            `you voted "${content}"`,
            5000
        ))
    }

    return (<>
        {
            sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )
        }
    </>)
}

export default AnecdoteList