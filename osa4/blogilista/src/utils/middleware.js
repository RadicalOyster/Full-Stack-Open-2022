const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    console.log("AUTHORIZING THIS ASSHOLE!!!!!!!!!!!!!!!!!!!!!", auth, "\n\n\n\n\n")
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const token = auth.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json( {error: 'token missing or invalid '} )
        }
        req['token'] = decodedToken
    }
    next()
}

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const user = await User.findById(req.token.id)
        req['user'] = user
    }
    else {
        req['user'] = undefined
    }
    next()
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: error.message })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'TypeError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' })
    }

    logger.error(error.message)

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}