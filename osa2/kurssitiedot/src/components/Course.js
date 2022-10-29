const Course = (props) => {
    return (
      <div>
        <CourseHeader course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }
  
  const CourseHeader = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }
  
  const Content = (props) => {
    const courses = props.parts
    return (
      <div>
        {courses.map(course => <Part name={course.name} exercises={course.exercises} key={course.id}/>)}
      </div>
    )
  }
  
  const Total = (props) => {
    const parts = props.parts
    const total = parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);
    return (
      <p><b>Total number of exercises: {total}</b></p>
    )
  }

  export default Course