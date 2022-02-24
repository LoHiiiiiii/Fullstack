import { useState } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
    const [expanded, setExpanded] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showWhenExpanded = { display: (expanded) ? '' : 'none' }
    const hideWhenExpanded = { display: (expanded) ? 'none' : '' }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button style={hideWhenExpanded} onClick={() => { setExpanded(true) }} id='viewButton'>view</button>
            <button style={showWhenExpanded} onClick={() => { setExpanded(false) }} id='hideButton'>hide</button>
            <div style={showWhenExpanded} className='expandedBlog'>
                <div>
                    {blog.url}
                </div>
                <div
                    style={(!blog.user) ? { display: 'none' } : {}}
                    className='likes'
                >
                    likes {blog.likes}
                    <button
                        onClick={addLike}
                        id='likeButton'
                    >
                        add a like
                    </button>
                </div>
                <div>
                    {(blog.user) ? ((blog.user.name) ? blog.user.name : 'Nameless user') : 'Unknown user'}
                </div>
                <button
                    onClick={deleteBlog}
                    id='removeButton'
                > remove</button>
            </div>
        </div>)
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default Blog