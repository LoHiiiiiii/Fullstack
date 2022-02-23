const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        response.status(401).json({
            error: "Token missing or invalid!"
        })
        return
    }

    if (!request.user) {
        response.status(401).json({
            error: "User no longer exists!"
        })
        return
    }

    try {
        const blogToRemove = await Blog.findById(request.params.id)
        if (blogToRemove.user && request.user._id.toString() !== blogToRemove.user.toString()) {
            response.status(401).json({
                error: "Can't remove a blog that isn't associated with this user!"
            })
            return
        }

        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send(exception)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    if (!request.token) {
        response.status(401).json({
            error: "Token missing or invalid!"
        })
        return
    }

    if (!request.user) {
        response.status(401).json({
            error: "User no longer exists!"
        })
        return
    }

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.user._id
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
        const blogToUpdate = await Blog.findById(request.params.id)
        if (request.user._id.toString() !== blogToUpdate.user.toString()) {
            response.status(401).json({
                error: "Can't update a blog that isn't associated with this user!"
            })
            return
        }
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        await result.populate('user', { username: 1, name: 1 })
        response.json(result)
    } catch (exception) {
        console.log(exception)
        response.status(400).send(exception)
    }

})

blogsRouter.post('', async (request, response) => {
    if (!request.token) {
        response.status(401).json({
            error: "Token missing or invalid!"
        })
        return
    }

    if (!request.user) {
        response.status(401).json({
            error: "User no longer exists!"
        })
        return
    }

    const blog = new Blog(request.body)
    blog.user = request.user._id

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
    await result.populate('user', {username: 1, name: 1})
    response.status(201).json(result)
})

module.exports = blogsRouter