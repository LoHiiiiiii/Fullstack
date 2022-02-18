const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        response.status(400).send(exception)
    }
})

blogsRouter.put('/:id', async (request, response) => {

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
    }

    if (!blog.title) {
        response.status(400).json({
            "error": "Title cannot be empty!"
        })
        return
    }

    if (!blog.url) {
        response.status(400).json({
            "error": "Url cannot be empty!"
        })
        return
    }

    if (!blog.likes) blog.likes = 0
    
    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(result)
    } catch (exception) {
        response.status(400).send(exception)
    }

})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title) {
        response.status(400).json({
            "error": "Title cannot be empty!"
        })
        return
    }

    if (!blog.url) {
        response.status(400).json({
            "error": "Url cannot be empty!"
        })
        return
    }

    if (!blog.likes) blog.likes = 0

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter