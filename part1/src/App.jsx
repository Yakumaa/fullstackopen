import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  const name = 'Peter'
  const age = 10

  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  console.log(now, a+b)

  return (
    <>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
      <p>it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>

      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </>
  )
}

export default App
