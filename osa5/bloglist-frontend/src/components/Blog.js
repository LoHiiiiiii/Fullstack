import { useState } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

const Blog = ({ blog , addLike, deleteBlog }) => {
    const [expanded, setExpanded] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (!expanded) {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author}
                <button onClick={() => { setExpanded(true) }}>view</button>
            </div>
        )
    } else {

        return (
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => { setExpanded(true) }}>hide</button>
                </div>
                <div>
                    {blog.url}
                </div>
                <div style={(!blog.user) ? { display: 'none' } : {}}>
                    likes {blog.likes}
                    <button onClick={addLike}> like</button>
                </div>
                <div>
                    {(blog.user) ? ((blog.user.name) ? blog.user.name : 'Nameless user') : 'Unknown user'}
                </div>
                <button onClick={deleteBlog}> remove</button>
            </div>
        )
    }
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default Blog