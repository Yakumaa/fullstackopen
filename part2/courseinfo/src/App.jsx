import Course from './components/Courses'

const App = ({courses}) => { 

  return (
    <div>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  )
}

export default App