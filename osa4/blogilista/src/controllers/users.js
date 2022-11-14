const bcrypt = require('bcrypt')
const { response } = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
        .populate('blogs', {url: 1, author: 1, title: 1, id: 1} ) 
    res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    const existingUser = await User.findOne( { username })
    if (existingUser) {
        next({message: "username must be unique", name: "ValidationError"})
        return
    }

    if (!password || password.length < 3) {
        next({message: "password must be at least 3 characters long", name: "ValidationError"})
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter