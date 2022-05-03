import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Warning from './components/Warning'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import {
    Routes, Route, useMatch, useNavigate
} from 'react-router-dom'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [warningMessage, setWarningMessage] = useState(null)

    const dispatch = useDispatch()

    const setBlogSorted = (blogs) => {
        blogs.sort(function (a, b) {
            if (!a.likes) return b.likes
            if (!b.likes) return -a.likes
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
        async function getUsers() {
            try {
                const users = await userService.getAll()
                setUsers(users)
            } catch (exception) {
                console.log(exception.message)
            }
        }

        getUsers()
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
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
        } catch (exception) {
            if (exception.message.includes('401'))
                setWarningMessage('Wrong username or password')
            else setWarningMessage('Can not reach server')
            setTimeout(() => {
                setWarningMessage(null)
            }, 5000)
        }
    }

    const navigate = useNavigate()
    const matchUser = useMatch('/users/:id')
    const matchBlog = useMatch('/blogs/:id')

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        navigate('/')
    }

    if (user) {
        const createBlog = async (newBlog) => {
            try {
                const response = await blogService.create(newBlog)
                dispatch(showNotification(
                    `a new blog '${response.title}' by ${response.author}`,
                    5000
                ))
                try {
                    const blogs = await blogService.getAll()
                    setBlogSorted(blogs)
                    const users = await userService.getAll()
                    setUsers(users)
                } catch (exception) {
                    console.log(exception.message)
                    setWarningMessage('failed to fetch blogs')
                    setTimeout(() => {
                        setWarningMessage(null)
                    }, 5000)
                }
            } catch (exception) {
                console.log(exception.message)
                setWarningMessage('failed to create blog')
                setTimeout(() => {
                    setWarningMessage(null)
                }, 5000)
            }
        }

        const addLike = async (blog) => {
            const modifiedBlog = {
                user: blog.user.id,
                likes: blog.likes + 1,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                comments: blog.comments,
            }

            try {
                const response = await blogService.update(blog.id, modifiedBlog)
                console.log('Liked!')
                dispatch(showNotification(`Liked blog '${response.title}'`, 5000))
                const blogs = await blogService.getAll()
                setBlogSorted(blogs)
            } catch (exception) {
                console.log(exception.message)
                setWarningMessage(`failed to like blog '${blog.title}'`)
                setTimeout(() => {
                    setWarningMessage(null)
                }, 5000)
            }
        }

        const addComment = async (blog, comment) => {
            const modifiedBlog = {
                user: blog.user.id,
                likes: blog.likes,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                comments: blog.comments.concat(comment)
            }
            console.log(modifiedBlog.comments)

            try {
                const response = await blogService.update(blog.id, modifiedBlog)
                console.log('Commented!')
                dispatch(showNotification(`Commented blog '${response.title}'`, 5000))
                const blogs = await blogService.getAll()
                setBlogSorted(blogs)
            } catch (exception) {
                console.log(exception.message)
                setWarningMessage(`failed to comment blog '${blog.title}'`)
                setTimeout(() => {
                    setWarningMessage(null)
                }, 5000)
            }
        }

        const deleteBlog = async (blog) => {
            if (
                window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)
            ) {
                try {
                    await blogService.remove(blog.id)
                    dispatch(showNotification(
                        `Removed blog '${blog.title}' by ${blog.author}`,
                        5000
                    ))
                    const blogs = await blogService.getAll()
                    setBlogSorted(blogs)
                    const users = await userService.getAll()
                    setUsers(users)
                    navigate('/')
                } catch (exception) {
                    console.log(exception.message)
                    setWarningMessage(`failed to remove blog '${blog.title}'`)
                    setTimeout(() => {
                        setWarningMessage(null)
                    }, 5000)
                }
            }
        }

        const links = [
            {
                address: '/',
                name: 'blogs'
            },
            {
                address: '/users',
                name: 'users'
            }
        ]

        const matchedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null
        const matchedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

        return (
            <div>
                <Menu links={links} name={user.name} handleLogout={handleLogout} />
                <h2>blog app</h2>
                <Warning message={warningMessage} />
                <Notification />
                <Routes>
                    <Route path='/' element={
                        <div>
                            <BlogForm createBlog={createBlog} />
                            <BlogList blogs={blogs} />
                        </div>} />
                    <Route path='/blogs/:id' element={<Blog blog={matchedBlog} addLike={() => { addLike(matchedBlog) }} deleteBlog={() => { deleteBlog(matchedBlog) }} addComment={(comment) => { addComment(matchedBlog, comment) }} />} />
                    <Route path='/users/:id' element={<User user={matchedUser} />} />
                    <Route path='/users' element={<UserList users={users} />} />
                </Routes>
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
                        id='username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        id='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit' id='loginButton'>
                    login
                </button>
            </form>
        </div>
    )
}

export default App
