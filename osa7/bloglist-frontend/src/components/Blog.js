import { useState } from 'react'
import React from 'react'

const Blog = ({ blog, addLike, deleteBlog, addComment }) => {
    if (!blog) return null

    const [comment, setComment] = useState('')

    const submitComment = () => {
        addComment(comment)
        setComment('')
    }

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <div>
                <a href={'//'+ blog.url}>{blog.url}</a>
                <div
                    style={!blog.user ? { display: 'none' } : {}}
                    className="likes"
                >
                    likes {blog.likes}
                    <button onClick={addLike} id="likeButton">
                        add a like
                    </button>
                </div>
                <div>added by {blog.user
                    ? blog.user.name
                        ? blog.user.name
                        : 'Nameless user'
                    : 'Unknown user'}
                </div>
                <button onClick={deleteBlog} id="removeButton">
                    {' '}
                    remove
                </button>

                <h3>comments</h3>
                <div>
                    <input
                        value={comment}
                        onChange={({ target }) => {
                            setComment(target.value)
                        }}
                        id='commentField'
                    />
                    <button onClick={submitComment} id="submitButton">
                        add comment
                    </button>
                </div>
                <ul>
                    {blog.comments.map(comment => <li key={comment}> {comment} </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Blog
