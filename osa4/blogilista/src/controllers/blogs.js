const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1, id: 1 })

    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const users = await User.find({})

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: users[0]._id
    })

    console.log(blog)

    const savedBlog = await blog.save()
    users[0].blogs = users[0].blogs.concat(savedBlog._id)
    await users[0].save()

    res.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const { likes } = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,
        { likes }, { new: true, runValidators: true, context: 'query' })

    res.status(200).json(updatedBlog)
})

module.exports = blogsRouter