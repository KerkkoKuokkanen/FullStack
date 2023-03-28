const Header = (header) => {
  return <h1>{header.course}</h1>
}

const Part = (part) => {
  const {part1, exercises} = part
  return (
    <p>
      {part1} {exercises}
    </p>
  )
}

const Content = (content) => {
  const {part1, exercises1, part2, exercises2, part3, exercises3} = content
  return (
    <div>
      <Part 
        part1={part1}
        exercises={exercises1}
      />
      <Part 
        part1={part2}
        exercises={exercises2}
      />
      <Part 
        part1={part3}
        exercises={exercises3}
      />
    </div>
  )
}

const Total = (total) => {
  const {exercises1, exercises2, exercises3} = total
  return (<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1} 
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total 
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

export default App