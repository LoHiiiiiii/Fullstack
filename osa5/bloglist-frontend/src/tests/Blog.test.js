import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


describe('Blog', () => {

    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'Url',
        likes: 1,
    }

    test('renders proper content when not expanded', () => {
        const container = render(<Blog
            blog={blog}
            addLike={() => { }}
            deleteBlog={() => { }}
        />).container

        screen.getByText(`${blog.title} ${blog.author}`)
        const div = container.querySelector('.expandedBlog')
        expect(div).toHaveStyle('display: none')
    })

    test('renders proper content when expanded', () => {
        const container = render(<Blog
            blog={blog}
            addLike={() => { }}
            deleteBlog={() => { }}
        />).container

        const button = screen.getByText('view')
        userEvent.click(button)

        const div = container.querySelector('.expandedBlog')
        expect(div).not.toHaveStyle('display: none')
        screen.getByText(`${blog.title} ${blog.author}`)
        screen.getByText(`${blog.url}`)
        screen.getByText(`likes ${blog.likes}`)
    })

    test('gains likes properly', () => {
        const mockHandler = jest.fn()

        render(<Blog
            blog={blog}
            addLike={mockHandler}
            deleteBlog={() => { }}
        />)

        const view = screen.getByText('view')
        userEvent.click(view)

        const like = screen.getByText('add a like')
        userEvent.click(like)
        userEvent.click(like)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})