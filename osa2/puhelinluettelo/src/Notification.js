const Notification = ({ name, message }) => {
    if (message === null || message === '') {
        return null
    }

    return (
        <div className={name}>
            {message}
        </div>
    )
}

export default Notification