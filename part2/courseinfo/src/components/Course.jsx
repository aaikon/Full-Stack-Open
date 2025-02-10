import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Course