import React from 'react'

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name}/>
      <Contents parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )
}

const Contents = (props) => {
  return (
    props.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p><b>total of {props.parts.reduce((prev, current) => prev+current.exercises, 0)} exercises</b></p>
  )
}

export default Course