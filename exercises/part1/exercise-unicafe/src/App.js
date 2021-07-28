import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /*const handleClick = () => {
    console.log('click')
  }*/

  const addGood = () => {
    console.log('added one good review')
    setGood(good +1)
  }

  const addNeutral = () => {
    console.log('added one neutral review')
    setNeutral(neutral +1)
  }

  const addBad = () => {
    console.log('added one bad review')
    setBad(bad +1)
  }

  /*setTimeout(
    () => setGood(good +1),
    1000
  )*/
  

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <button onClick={addGood}>
          good
        </button>
        <button onClick={addNeutral}>
          neutral
        </button>
        <button onClick={addBad}>
          bad
        </button>
      </div>

      <h1>statistics</h1>

      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      
    </div>
  )
}

export default App