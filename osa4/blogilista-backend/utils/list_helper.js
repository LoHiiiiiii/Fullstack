const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    let totalLikes = 0
    blogs.forEach(blog => totalLikes += blog.likes)
    return totalLikes
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.forEach(blog => maxLikes = Math.max(maxLikes, blog.likes))
    const favoriteBlog = blogs.find(blog => blog.likes === maxLikes)
    if (!favoriteBlog) return null
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    let maxBlogs = 0
    const authorBlogs = {}

    blogs.forEach(blog => {
        if (authorBlogs[blog.author]) authorBlogs[blog.author].blogs++
        else authorBlogs[blog.author] = {
            author: blog.author,
            blogs: 1
        }

        maxBlogs = Math.max(maxBlogs, authorBlogs[blog.author].blogs)
    })

    maxBlogAuthor = null
    Object.keys(authorBlogs).forEach(author => {
        if (authorBlogs[author].blogs === maxBlogs) maxBlogAuthor = authorBlogs[author]
    })
    return maxBlogAuthor
}

const mostLikes = (blogs) => {
    let maxLikes = 0
    const authorLikes = {}

    blogs.forEach(blog => {
        if (authorLikes[blog.author]) authorLikes[blog.author].likes += blog.likes
        else authorLikes[blog.author] = {
            author: blog.author,
            likes: blog.likes
        }

        maxLikes = Math.max(maxLikes, authorLikes[blog.author].likes)
    })

    maxLikeAuthor = null
    Object.keys(authorLikes).forEach(author => {
        if (authorLikes[author].likes === maxLikes) maxLikeAuthor = authorLikes[author]
    })
    return maxLikeAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}