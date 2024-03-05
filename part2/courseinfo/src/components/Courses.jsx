const Header = (props) => {
  // console.log(props)
  // const result = props.course.map((courses) => (courses.name))
  // console.log(result)
 
  return(
      // <h1>{result}</h1>
      <h1>{props.course.name}</h1>
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
      {props.parts.map( part => <Part key={part.id} parts={part} />)}
    </>
  )
}

const Total = (props) => {
  // console.log(props.parts)
  const total = props.parts.reduce((s, p) => {
    // console.log(s, p)
    return s + p.exercises
  }, 0)
  // console.log(total)
  return(
    <>
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

export default Course