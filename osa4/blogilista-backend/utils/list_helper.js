const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    let totalLikes = 0
    blogs.forEach(blog => totalLikes += blog.likes)
    return totalLikes
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    blogs.forEach(blog => maxLikes = Math.max(maxLikes, blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}