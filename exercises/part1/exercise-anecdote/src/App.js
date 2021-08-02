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
   
  const [selected, setSelected] = useState(anecdotes[Math.floor(Math.random()*anecdotes.length)])
  
  //comes one step late?
  const GenerateAnecdote = () => {
    console.log('Number of anecdotes: ',anecdotes.length)
    const rnd = Math.floor(Math.random()*anecdotes.length)
    console.log('Random number selected: ', rnd)
    setSelected(anecdotes[rnd])
    console.log(selected)
  }

  return (
    <div>
      <p>{selected}</p>
      <Button handleClick={GenerateAnecdote} />
      {console.log('------------------------------------')}
    </div>
  )
}

const Button = (props) => {
  return (
    <button  onClick={props.handleClick}>
      Press me to generate a new anecdote!
    </button>
  )
}

export default App