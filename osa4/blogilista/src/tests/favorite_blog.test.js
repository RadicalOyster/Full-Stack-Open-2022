const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/blogs_list_for_tests').blogs

const oneBlogList = [blogs[0]]

describe('Favorite blogs returns', () => {
    test('undefined for list of length zero', () => {
        expect(favoriteBlog([])).toBe(undefined)
    })
    
    test('the only blog in the list for list of length one', () => {
        expect(favoriteBlog(oneBlogList)).toEqual(oneBlogList[0])
    })

    test('the blog with the most likes for a longer list', () => {
        expect(favoriteBlog(blogs)).toEqual(blogs[2])
    })
})
