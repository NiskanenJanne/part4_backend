const dummy = (blogs) => {
    dummy = 1
}
const totalLikes = (blogs) => {
    blogs.reduce((tot, now) => tot = tot + now.likes, 0)
}

const favouriteBlog = (blogs) => {
    blogs.reduce((prevblog, blog) => blog.likes  > prevblog.likes ? blog : prev)
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}

