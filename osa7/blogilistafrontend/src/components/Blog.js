import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className="titleContainer">
                            <Link
                                to={`/blogs/${blog.id}`}
                            >
                                {blog.title}
                            </Link>
                        </td>
                        <td className="author">{blog.author}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Blog
