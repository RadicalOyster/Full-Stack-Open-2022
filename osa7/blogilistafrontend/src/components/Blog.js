import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
    return (
        <div className="blogFrame">
            <div>
                <span>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </span>{' '}
                | {blog.author}
            </div>
        </div>
    )
}

export default Blog
