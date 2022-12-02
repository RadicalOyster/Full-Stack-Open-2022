const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Blog = require('../models/blog')

commentsRouter.get('/', async (req, res) => {
    const comments = await Comment.find({})
    res.json(comments)
})

module.exports = commentsRouter