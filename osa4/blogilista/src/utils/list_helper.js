const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce(
        (previousValue, currentValue) => previousValue + currentValue.likes, 0
    )
    return sum
}

const favoriteBlog = (blogs) => {
    let index = 0
    let favorite = undefined

    while (index < blogs.length) {
        if (!favorite) {
            favorite = blogs[index]
        } 
        else if (blogs[index].likes > favorite.likes) {
            favorite = blogs[index]
        }
        index++
    }

    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    var mostWritten
    var mostBlogs = 0

    const authorsMap = new Map();
    let index = 0

    while (index < blogs.length) {
        let blog = blogs[index]

        if (authorsMap.has(blog.author)){
            authorsMap.set(blog.author, authorsMap.get(blog.author) + 1)
        }
        else {
            authorsMap.set(blog.author, 1)
        }

        if (!mostWritten) {
            mostWritten = blog.author
            mostBlogs = authorsMap.get(blog.author)
        }
        else {
            if (authorsMap.get(blog.author) > mostBlogs) {
                mostWritten = blog.author
                mostBlogs = authorsMap.get(blog.author)
            }
        }

        index++
    }

    return { "author": mostWritten, "blogs": mostBlogs }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    var mostPopular
    var mostLikes = 0

    const authorsMap = new Map();
    let index = 0

    while (index < blogs.length) {
        let blog = blogs[index]

        if (authorsMap.has(blog.author)){
            authorsMap.set(blog.author, authorsMap.get(blog.author) + blog.likes)
        }
        else {
            authorsMap.set(blog.author, blog.likes)
        }

        if (!mostPopular) {
            mostPopular = blog.author
            mostLikes = authorsMap.get(blog.author)
        }
        else {
            if (authorsMap.get(blog.author) > mostLikes) {
                mostPopular = blog.author
                mostLikes = authorsMap.get(blog.author)
            }
        }

        index++
    }

    return { "author": mostPopular, "likes": mostLikes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}