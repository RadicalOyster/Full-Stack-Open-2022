import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleBlogView = ({ addLike }) => {
    let blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    const blog = blogs.find((blog) => blog.id === id)
    if (blog) {
        return (
            <div>
                <h2>{blog.title}</h2>
                <a target="_blank" href={blog.url}>{blog.url}</a>
                <div>{blog.likes} likes <button onClick={() => addLike(blog)}>Like</button></div>
                <div>
                    added by {blog.user.name}{' '}
                </div>
            </div>
        )
    }
}

export default SingleBlogView
