const Header = (header) => {
  return <h1>{header.course}</h1>
}

const Part = (part) => {
  return (
    // way to use parameters as shown in the course example
    <p>
      {part.par} {part.exercises}
    </p>
  )
}

const Content = (content) => {
  const {part1, exercises1, part2, exercises2, part3, exercises3} = content // I found using chat-gpt this way to use parameters, so I wanted to try it
  return (
    <div>
      <Part 
        par={part1}
        exercises={exercises1}
      />
      <Part 
        par={part2}
        exercises={exercises2}
      />
      <Part 
        par={part3}
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