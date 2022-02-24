import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Warning from './components/Warning'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [warningMessage, setWarningMessage] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)

    const setBlogSorted = (blogs) => {
        blogs.sort(function (a, b) {
            if (!a.likes)
                return b.likes
            if (!b.likes)
                return -a.likes
            return b.likes - a.likes
        })
        setBlogs(blogs)
    }


    useEffect(() => {
        async function getBlogs() {
            try {
                const blogs = await blogService.getAll()
                setBlogSorted(blogs)
            } catch (exception) {
                console.log(exception.message)
            }
        }

        getBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        } catch (exception) {
            if (exception.message.includes('401')) setWarningMessage('Wrong username or password')
            else setWarningMessage('Can not reach server')
            setTimeout(() => { setWarningMessage(null) }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
    }

    if (user) {

        const createBlog = async (newBlog) => {

            try {
                const response = await blogService.create(newBlog)
                setNotificationMessage(`a new blog "${response.title}" by ${response.author}`)
                setTimeout(() => { setNotificationMessage(null) }, 5000)
                try {
                    const blogs = await blogService.getAll()
                    setBlogSorted(blogs)
                } catch (exception) {
                    console.log(exception.message)
                    setWarningMessage('failed to fetch blogs')
                    setTimeout(() => { setWarningMessage(null) }, 5000)
                }
            } catch (exception) {
                console.log(exception.message)
                setWarningMessage('failed to create blog')
                setTimeout(() => { setWarningMessage(null) }, 5000)
            }

        }

        const addLike = async (blog) => {
            const modifiedBlog = {
                user: blog.user.id,
                likes: blog.likes + 1,
                title: blog.title,
                author: blog.author,
                url: blog.url
            }

            try {
                const response = await blogService.update(blog.id, modifiedBlog)
                setNotificationMessage(`Liked blog "${response.title}"`)
                setTimeout(() => { setNotificationMessage(null) }, 5000)
                const blogs = await blogService.getAll()
                setBlogSorted(blogs)
            } catch (exception) {
                console.log(exception.message)
                setWarningMessage(`failed to like blog "${blog.title}"`)
                setTimeout(() => { setWarningMessage(null) }, 5000)
            }

        }

        const deleteBlog = async (blog) => {
            if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
                try {
                    await blogService.remove(blog.id)
                    setNotificationMessage(`Removed blog "${blog.title}" by ${blog.author}`)
                    setTimeout(() => { setNotificationMessage(null) }, 5000)
                    const blogs = await blogService.getAll()
                    setBlogSorted(blogs)
                } catch (exception) {
                    console.log(exception.message)
                    setWarningMessage(`failed to remove blog "${blog.title}"`)
                    setTimeout(() => { setWarningMessage(null) }, 5000)
                }
            }
        }

        return (
            <div>
                <h2>blogs</h2>
                <Warning message={warningMessage} />
                <Notification message={notificationMessage} />
                <div>
                    <p>
                        {user.name} logged in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                </div>
                <BlogForm createBlog={createBlog} />
                {blogs.map(blog =>
                    <Blog
                        key={ blog.id }
                        blog={ blog }
                        addLike={() => { addLike(blog) }}
                        deleteBlog={() => { deleteBlog(blog) }}
                    />
                )}
            </div>
        )
    }

    return (
        <div>
            <h2>log in to application</h2>
            <Warning message={warningMessage} />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default App