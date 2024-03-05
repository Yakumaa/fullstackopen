const Header = (props) => {
  // console.log(props)
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  // console.log(props)
  return(
    <>
      <p>{props.parts.name} {props.parts.exercises}</p>
    </>
  )
}

const Content = (props) => {
  // console.log(props)
  return(
    <>
      <Part parts={props.parts[0]} />
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  // console.log(props.parts)
  const total = props.parts.reduce((s, p) => {
    console.log(s, p)
    return s + p.exercises
  }, 0)
  // console.log(total)
  return(
    <>
      {/* <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p> */}
      <p>Number of exercises {total}</p>
    </>
  )
}



const Course = (props) => {
  console.log(props)
  return(
    <>
      <Header course = {props.course} />
      <Content parts = {props.course.parts}/>
      <Total parts = {props.course.parts}/>
    </>
  )
}

const App = () => { 
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      } 
    ]
  }

  return (
    <div>
      {/* <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} /> */}
      <Course course={course} />
    </div>
  )
}

export default App