const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('../utils/blogs_list_for_tests').blogs

const oneBlogList = [blogs[5]]

describe('Total likes', () => {
    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0)
    })
    
    test('for list with one blog equals likes of that blog', () => {
        expect(totalLikes(oneBlogList)).toBe(2)
    })

    test('for list with more than one blog to equal the likes of all blogs in list', () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})