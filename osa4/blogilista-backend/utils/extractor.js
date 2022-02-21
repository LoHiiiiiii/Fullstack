const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const userExtractor = async (request, response, next) => {
    const authorization = request.get('Authorization')
    const schema = 'bearer '

    if (!authorization || !authorization.toLowerCase().startsWith(schema)) {
        next()
        return
    }
    
    request.token = authorization.substring(schema.length)

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        
        if (!user) {
            next()
            return
        }
        request.user = user

    } catch (exception) {
        logger.error(exception)
    }

    next()
}

module.exports = userExtractor