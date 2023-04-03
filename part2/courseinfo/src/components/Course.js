
const Header = ({header}) => {
    return <h2>{header}</h2>
}
  
const Part = (part) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}
  
const Content = ({content}) => {
    return (
      <div>
        {content.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )}
      </div>
    )
}
  
const Total = ({content}) => {
    const sum = content.reduce((tot, curr) => tot + curr.exercises, 0) // zero at the end gives the "tot" the initial value of 0
    return (<h4>total of {sum} exercises</h4>)
}
  
const Course = ({course}) => {
    return (
      <div>
        <Header header={course.name} />
        <Content content={course.parts} />
        <Total content={course.parts} />
      </div>
    )
}

export default Course