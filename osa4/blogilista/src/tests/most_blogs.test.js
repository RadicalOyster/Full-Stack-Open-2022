const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('../utils/blogs_list_for_tests').blogs

const oneBlogList = [blogs[0]]

describe('Most blogs returns', () => {
    test('undefined for list of length zero', () => {
        expect(mostBlogs([])).toBe(undefined)
    })
    
    test('first author with one blog for list of length one', () => {
        expect(mostBlogs(oneBlogList)).toEqual({ "author": "Michael Chan", "blogs": 1})
    })

    test('author with the most blogs and the number of blogs by that author for larger lists', () => {
        expect(mostBlogs(blogs)).toEqual({ "author": "Robert C. Martin", "blogs": 3 })
    })
})
