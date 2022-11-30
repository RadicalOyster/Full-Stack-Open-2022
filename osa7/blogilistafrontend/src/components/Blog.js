import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
    const [expanded, setExpanded] = useState(false)
    const showWhenExpanded = { display: expanded ? '' : 'none' }
    const showDelete = { display: blog.user.name === user.name ? '' : 'none' }

    const toggleExpansion = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="blogFrame">
            <div>
                <span className="clickableText" onClick={toggleExpansion}>
                    {blog.title}
                </span>{' '}
                | {blog.author}
            </div>
            <div style={showWhenExpanded}>
                <span>{blog.url}</span>
                <div>
                    {blog.likes} likes{' '}
                    <button className="likeButton" onClick={handleLike}>
                        like
                    </button>
                </div>
                <button
                    id="deleteButton"
                    onClick={handleDelete}
                    style={showDelete}
                >
                    Delete blog
                </button>
            </div>
        </div>
    )
}

export default Blog
