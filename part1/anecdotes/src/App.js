import { useState } from 'react'

const Button = ({click, text}) => (
  <button onClick={click}>{text}</button>
)


//function for getting random number between 0 and 7. Does not return the already given number "selected"
const GetRandomNum = (selcted) => {
  let ret = Math.floor(Math.random() * 8)
  while (ret === selcted)
    ret = Math.floor(Math.random() * 8)
  return (ret)
}

const GetVotes = (votes, selected) => {
  let cpy = [...votes]
  cpy[selected] += 1
  return (cpy)
}

const GetMostVotes = (votes) => {
  let max = 0
  let winner = 0
  console.log(votes)
  for (let i = 0; i < votes.length; i++)
  {
    if (max < votes[i])
    {
      winner = i
      max = votes[i]
    }
  }
  return (winner)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const mostVotes = GetMostVotes(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <Button click={() => setVotes(GetVotes(votes, selected))} text = 'vote' />
      <Button click={() => setSelected(GetRandomNum(selected))} text = 'next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
    </div>
  )
}

export default App