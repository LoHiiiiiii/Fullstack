const express = require('express')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const userExtractor = require('./utils/extractor')
const cors = require('cors')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app