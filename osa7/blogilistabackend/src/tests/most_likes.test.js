const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('../utils/blogs_list_for_tests').blogs

const oneBlogList = [blogs[0]]

describe('Most likes returns', () => {
    test('undefined for list of length zero', () => {
        expect(mostLikes([])).toBe(undefined)
    })
    
    test('first author with the correct number of likes for list of length one', () => {
        expect(mostLikes(oneBlogList)).toEqual({ "author": "Michael Chan", "likes": 7})
    })

    test('author with the most blogs and the number of blogs by that author for larger lists', () => {
        expect(mostLikes(blogs)).toEqual({ "author": "Edsger W. Dijkstra", "likes": 17 })
    })
})
