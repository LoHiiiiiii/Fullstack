import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const random = (max) => Math.floor(Math.random() * max)

    const nonDuplicateRandom = (current, max) => {
        const value = random(max - 1)
        if (value >= current) return value + 1
        return value
    }

    const [selected, setSelected] = useState(random(anecdotes.length))
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

    const maxPointIndex = points.indexOf(Math.max(...points))

    const showNext = () => {
        const random = nonDuplicateRandom(selected, anecdotes.length)
        setSelected(random)
    }

    const voteSelected = () => {
        const copy = [...points]
        copy[selected]++
        setPoints(copy)
    }

    return (
        <>
            <Header header="Anecdote of the day"/>
            <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
            <Button text="next anecdote" onClick={() => showNext()} />
            <Button text="vote" onClick={() => voteSelected()}/>
            <Header header="Anecdote with most votes"/>
            <Anecdote anecdote={anecdotes[maxPointIndex]} votes={points[maxPointIndex]}/>
        </>
    )
}

const Anecdote = ({ anecdote, votes }) => {
    return (
        <>
            <p>{anecdote}</p>
            <p>This anecdote has {votes} votes</p>
        </>
    )
}

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

export default App