import Header from "./Header";
import Content from "./Content";

const Course = ({courses}) => {
  return <div>
    {
      courses.map(course => (
        <>
          <Header course={course.name} />
          <Content parts={course.parts} />
        </>
      ))
    }
  </div>
}

export default Course
