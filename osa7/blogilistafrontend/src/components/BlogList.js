import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const BlogList = ({ user, addLike, deleteBlog }) => {
    const blogs = [...useSelector((state) => state.blogs)]

    if (!blogs) {
        return <div></div>
    }

    blogs.sort((blog1, blog2) => (blog1.likes > blog2.likes ? -1 : 1))

    return (
        <div className="blogsContainer">
            <Table striped>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    user={user}
                                    handleLike={() => addLike(blog)}
                                    handleDelete={() => deleteBlog(blog)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default BlogList
