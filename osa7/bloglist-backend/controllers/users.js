const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        author: 1,
        title: 1,
        date: 1,
        url: 1,
        likes: 1,
        comments: 1,
    })
    response.json(users)
})

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body
    const charLowerBound = 3

    if (!username) {
        response.status(400).json({
            error: "Username can't be empty!",
        })
        return
    }

    if (username.length < charLowerBound) {
        response.status(400).json({
            error: "Username must be at least 3 characters!",
        })
        return
    }

    if (!password) {
        response.status(400).json({
            error: "Password can't be empty!",
        })
        return
    }

    if (password.length < charLowerBound) {
        response.status(400).json({
            error: "Password must be at least 3 characters!",
        })
        return
    }

    const existingUser = await User.exists({ username: username })

    if (existingUser) {
        response.status(400).json({
            error: "Username already exists!",
        })
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter
