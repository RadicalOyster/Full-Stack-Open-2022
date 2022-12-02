import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleBlogView = ({ addLike, handleDelete, addComment }) => {
    let blogs = useSelector((state) => state.blogs)
    const id = useParams().id

    const blog = blogs.find((blog) => blog.id === id)

    const user = useSelector((state) => state.loggedUser)

    if (user) {
        if (blog) {
            const comments = blog.comments
            const showDelete = {
                display: blog.user.name === user.name ? '' : 'none',
            }
            return (
                <div>
                    <h2>{blog.title}</h2>
                    <a target="_blank" href={blog.url}>
                        {blog.url}
                    </a>
                    <div>
                        {blog.likes} likes{' '}
                        <button onClick={() => addLike(blog)}>Like</button>
                    </div>
                    <div>added by {blog.user.name} </div>
                    <button
                        id="deleteButton"
                        onClick={() => handleDelete(blog)}
                        style={showDelete}
                    >
                        Delete blog
                    </button>
                    <h3>Comments</h3>
                    <form onSubmit={addComment}>
                    <input name="comment"/><button type="submit">Add comment</button>
                    <input name="blog" type="hidden" value={blog.id}/>
                    <input name="title" type="hidden" value={blog.title}/>
                    </form>
                    {comments.map((comment) => {
                        return <li key={comment.id}>{comment.content}</li>
                    })}
                </div>
            )
        }
    } else {
        return null
    }
}

export default SingleBlogView
