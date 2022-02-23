import {useState} from 'react'
import React from 'react'

const BlogForm = ({ createBlog }) => {

    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const handleCreate = (event) => {
        event.preventDefault()

        setVisible(false)
        const blog = {
            title: title,
            author: author,
            url: url
        }
        createBlog(blog)
    }

    return (<>
        <div style={hideWhenVisible}>
            <button onClick={() => { setVisible(true) }}>create new</button>
        </div>
        <div style={showWhenVisible}>
            <h2>create new</h2>

            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input
                        value={title}
                        onChange={({ target }) => { setTitle(target.value)}}
                    />
                </div>
                <div>
                    author:
                    <input
                        value={author}
                        onChange={({ target }) => { setAuthor(target.value)}}
                    />
                </div>
                <div>
                    url:
                    <input
                        value={url}
                        onChange={({ target }) => { setUrl(target.value)}}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    </>)
}

export default BlogForm