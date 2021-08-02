import React, { useState } from 'react'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad

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

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={addGood} text="good" />
        <Button handleClick={addNeutral} text="neutral" />
        <Button handleClick={addBad} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/> 
    </div>
  )
}

const Button = (props) => {
  return (
      <button onClick={props.handleClick} > 
        {props.text} 
      </button>
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
      <table><tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={(props.good-props.bad)/(props.good+props.bad+props.neutral)} />
        <StatisticLine text="positive" value={(100*props.good)/(props.good+props.bad+props.neutral)} symbol={"%"}/>
        </tbody></table>
    )
  }
}

const StatisticLine = (props) => {
  return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} {props.symbol}</td>
        </tr>  
  )
}


export default App