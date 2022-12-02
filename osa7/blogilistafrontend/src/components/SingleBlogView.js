import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Form, Table } from 'react-bootstrap'

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
                    <h2>
                        {blog.title} | {blog.author}
                    </h2>
                    <a target="_blank" href={blog.url}>
                        {blog.url}
                    </a>
                    <div>
                        {blog.likes} likes{' '}
                        <Button onClick={() => addLike(blog)} size="small">
                            Like
                        </Button>
                    </div>
                    <div>added by {blog.user.name} </div>
                    <Button
                        className="blogButton"
                        id="deleteButton"
                        onClick={() => handleDelete(blog)}
                        style={showDelete}
                        size="small"
                    >
                        Delete blog
                    </Button>
                    <h3>Comments</h3>
                    <form onSubmit={addComment}>
                        <Form.Control name="comment" />
                        <Button
                            type="submit"
                            size="small"
                            className="blogButton"
                        >
                            Add comment
                        </Button>
                        <Form.Control
                            name="blog"
                            type="hidden"
                            value={blog.id}
                        />
                        <Form.Control
                            name="title"
                            type="hidden"
                            value={blog.title}
                        />
                    </form>

                    <div className="commentsList">
                        <Table striped>
                            <tbody>
                                {comments.map((comment) => {
                                    return (
                                        <tr key={comment.id}>
                                            <td>{comment.content}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )
        }
    } else {
        return null
    }
}

export default SingleBlogView
