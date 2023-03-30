
import { useState } from 'react'

const Button = ({click, text}) => (
  <button onClick={click}>{text}</button>
)

const Average = (good, neutral, bad) => {
  let unit
  if (good + bad + neutral === 0)
    unit = 0
  else
    unit = 1 / (good + neutral + bad)
  return (unit * good - unit * bad)
}

const Positive = (good, neutral, bad) => {
  const all = good + bad + neutral
  if (all === 0)
    return (0)
  return (good / all * 100)
}

const StatisticsLine = ({text, value}) =>(
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + bad + neutral === 0)
    return (<p>No feedback given</p>)
  const avrg = Average(good, neutral, bad)
  const pos = Positive(good, neutral, bad)
  return (
  <table>
    <tbody>
      <StatisticsLine text = "good" value = {good} />
      <StatisticsLine text = "neutral" value = {neutral} />
      <StatisticsLine text = "bad" value = {bad} />
      <StatisticsLine text = "all" value = {good + bad + neutral} />
      <StatisticsLine text = "average" value = {avrg} />
      <StatisticsLine text = "positive" value = {pos + " %"} />
    </tbody>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={() => setGood(good + 1)} text = 'good' />
      <Button click={() => setNeutral(neutral + 1)} text = 'neutral' />
      <Button click={() => setBad(bad + 1)} text = 'bad' />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App