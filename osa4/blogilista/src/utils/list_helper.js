const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce(
        (previousValue, currentValue) => previousValue + currentValue.likes, 0
    )
    return sum
}

module.exports = {
    dummy,
    totalLikes
}