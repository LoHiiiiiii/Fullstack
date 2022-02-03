const Course = ({ course }) => {
    return (
        <>
            <Header header={course.name} />
            <Content content={course.parts} />
        </>
    )
}

const Header = ({ header }) => {
    return (
        <>
            <h2>{header}</h2>
        </>
    )
}

const Content = ({ content }) => {
    const total = content.reduce((total, part) => total + part.exercises, 0)

    return (
        <>
            {content.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <h3> total of {total} exercises </h3>
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <>
            <p>{name} {exercises}</p>
        </>
    )
}

export default Course