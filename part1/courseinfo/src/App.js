const Header = (header) => {
  return <h1>{header.course.name}</h1>
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
  return (
    <div>
      <Part 
        par={content.parts[0].name}
        exercises={content.parts[0].exercises}
      />
      <Part 
        par={content.parts[1].name}
        exercises={content.parts[1].exercises}
      />
      <Part 
        par={content.parts[2].name}
        exercises={content.parts[2].exercises}
      />
    </div>
  )
}

const Total = (total) => {
  return (<p>Number of exercises {total.parts[0].exercises + total.parts[1].exercises + total.parts[2].exercises}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App