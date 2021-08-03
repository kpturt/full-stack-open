import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    '0 If it hurts, do it more often.',
    '1 Adding manpower to a late software project makes it later!',
    '2 The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '3 Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '4 Premature optimization is the root of all evil.',
    '5 Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    '6 Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [rnd, setRnd] = useState(Math.floor(Math.random()*anecdotes.length))
  const [selected, setSelected] = useState(anecdotes[rnd])
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
  
  const generateAnecdote = () => {
    console.log('Generating new anecdote')
    //console.log('Number of anecdotes: ', anecdotes.length)
    const tmp = Math.floor(Math.random()*anecdotes.length)
    setSelected(anecdotes[tmp])
    setRnd(tmp)
  }

  const addVote = () => {
    console.log('Adding vote')
    const copy = {...points}
    copy[rnd] += 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{selected}</p>
      <p>{/*rnd*/} has {points[rnd]} votes</p>
      <button onClick={addVote}>vote</button>
      <button onClick={generateAnecdote}>new anecdote</button>
    </div>
  )
}



export default App