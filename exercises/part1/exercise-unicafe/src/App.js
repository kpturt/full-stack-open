import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let average = 0
  let isEmpty = 0
  

  const addGood = () => {
    console.log('added one good review')
    setGood(good+1)
  }

  const addNeutral = () => {
    console.log('added one neutral review')
    setNeutral(neutral +1)
  }

  const addBad = () => {
    console.log('added one bad review')
    setBad(bad +1)
  }

  const handleClick = () => {
    console.log('click')
  }

  //why doesn't work outside of the function and is one click behind?
  const calculateAverage = () => {
    console.log('calcucalting average')
    all = all +1
    console.log('all: ',all)
    average = (good-bad)/(good+bad+neutral)
    console.log('average: ',average)
  }

  //need to implement somehow
  if((good||bad||neutral) === 0){
    isEmpty = 0
    console.log('no feedback given, isEmpty: ', isEmpty)
  } else {
    isEmpty = 1
    console.log('feedback has been given, isEmpty: ', isEmpty)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <button onClick={() => { handleClick(); addGood(); calculateAverage(); }}>
          good
        </button>
        <button onClick={() => {handleClick(); addNeutral(); calculateAverage(); }}>
          neutral
        </button>
        <button onClick={() => {handleClick(); addBad(); calculateAverage(); }}>
          bad
        </button>
      </div>

      <h1>statistics</h1>

      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {(good-bad)/(good+bad+neutral)}</div>
      <div>positive {(100*good)/(good+bad+neutral)} %</div>
      
    </div>
  )
}


export default App