import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        appendAnecdote(state, action) { state.push(action.payload) },
        setAnecdotes(state, action) { return action.payload },
        updateAnecdote(state, action) {
            return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
        }

    }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = {
            content: content,
            votes: 0
        }

        const receivedAnecdote = await anecdoteService.createNew(newAnecdote)
        dispatch(appendAnecdote(receivedAnecdote))
    }
}

export const voteAnecdote = id => {
    return async (dispatch, getState) => {
        const anecdoteToChange = getState().anecdotes.find(anecdote => anecdote.id === id)
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        }
        const newAnecdote = await anecdoteService.update(changedAnecdote.id, changedAnecdote)
        dispatch(updateAnecdote(newAnecdote))
    }
}

export default anecdoteSlice.reducer