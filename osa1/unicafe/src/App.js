import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <Header header="give feedback"/>
            <Button text="good" onClick={() => { setGood(good + 1) }}/>
            <Button text="neutral" onClick={() => { setNeutral(neutral + 1) }}/>
            <Button text="bad" onClick={() => { setBad(bad + 1) }}/>
            <Header header="statistics"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </>
    )
}

const Header = ({ header }) => <h1> {header}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
                                    
    if (total == 0) return <p>No feedback given</p>

    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={total}/>
                <StatisticLine text="average" value={(good - bad) / total}/>
                <StatisticLine text="positive" value={(good / total) * 100 + " %"} />
            </tbody>
        </table>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

export default App