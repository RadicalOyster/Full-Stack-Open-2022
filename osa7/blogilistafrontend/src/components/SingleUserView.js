import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleUserView = () => {
    let blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    blogs = blogs.filter((blog) => blog.user.id === id)
    return (
        <div>
            <h2>Blogs Added</h2>
            <ul>
                {blogs.map((blog) => {
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </div>
    )
}

export default SingleUserView
