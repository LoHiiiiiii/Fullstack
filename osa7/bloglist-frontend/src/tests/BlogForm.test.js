import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('BlogForm', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'Url',
    }

    test('posts properly', () => {
        const mockHandler = jest.fn()

        const container = render(
            <BlogForm createBlog={mockHandler} />
        ).container

        const title = container.querySelector('#titleField')
        const author = container.querySelector('#authorField')
        const url = container.querySelector('#urlField')
        userEvent.type(title, blog.title)
        userEvent.type(author, blog.author)
        userEvent.type(url, blog.url)
        const submit = screen.getByText('create')
        userEvent.click(submit)

        expect(mockHandler.mock.calls[0][0]).toEqual(blog)
    })
})
