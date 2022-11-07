const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    }
]

const newBlog = {
    "title": "How to care for your moose",
    "author": "BigRedGuy",
    "url": "www.mooseparadise.com"
}

beforeEach(async () => {
    await Blog.deleteMany({})

    initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
    })
})

describe('Retrieving blogs from the database:', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('get returns every blog in the database', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body.length).toEqual(initialBlogs.length)
    })

    test('returned blogs have id property', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })
})

describe('Adding blogs to the database:', () => {
    test('new blog returns status code 201', async () => {
        const res = await api.post('/api/blogs').send(newBlog).expect(201)
    })

    test('new blog gets added to the database', async () => {
        const content = await api.get('/api/blogs')

        const res = await api.post('/api/blogs').send(newBlog)

        const newContent = await api.get('/api/blogs')

        expect(newContent.body.length).toEqual(content.body.length + 1)
        expect(newContent.body.at(-1)).toEqual(res.body)
    })

    test('if new blog has no likes property, likes default to 0', async () => {
        const res = await api.post('/api/blogs').send(newBlog)

        expect(res.body.likes).toEqual(0)
    })

    test('adding new blog without title returns status code 400', async () => {
        let blog = { name: "Albert Einstein", url: "www.albertsthoughts.com" }
        await api.post('/api/blogs').send(blog).expect(400)
    })

    test('adding new blog without url returns status code 400', async () => {
        let blog = { name: "Albert Einstein", title: "Everything is Relative" }
        await api.post('/api/blogs').send(blog).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})