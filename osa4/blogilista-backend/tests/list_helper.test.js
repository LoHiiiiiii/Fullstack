const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testHelper.initialBlogs)
        expect(result).toBe(36)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testHelper.initialBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBeNull()
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(testHelper.initialBlogs)
        expect(result).toEqual(testHelper.initialBlogs[2])
    })
})

describe('most blogs', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBeNull()
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(testHelper.initialBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBeNull()
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(testHelper.initialBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})