
const dummy = (blogs) => {
    return (1)
}

const totalLikes = (blogs) => {
    return (blogs.reduce((sum, like) => sum + like.likes, 0))
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((maxLikes, likes) => {
       return ((likes.likes > maxLikes.likes) ? likes : maxLikes)
    })
    return (mostLikes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
