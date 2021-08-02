import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let average = 0

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

      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      
    </div>
  )
}

const Statistics = (props) => {

  if(props.good+props.neutral+props.bad === 0){
    console.log('No feedback given.')
    return (
      <div>
        <p>No feedback has been given</p>
      </div>
    )
  }
  else{
    console.log('Feedback has been given.')
    return (
      <div>
        <div>good {props.good}</div>
        <div>neutral {props.neutral}</div>
        <div>bad {props.bad}</div>
        <div>all {props.all}</div>
        <div>average {(props.good-props.bad)/(props.good+props.bad+props.neutral)}</div>
        <div>positive {(100*props.good)/(props.good+props.bad+props.neutral)} %</div>
      </div>
    )
  }
}


export default App