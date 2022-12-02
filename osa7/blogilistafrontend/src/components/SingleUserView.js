import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const SingleUserView = () => {
    let blogs = useSelector((state) => state.blogs)
    const users = useSelector((state) => state.users)
    const id = useParams().id

    if (!users) {
        return null
    }

    const user = users.find(user => user.id === id)

    if (!user) {
        return null
    }

    blogs = blogs.filter((blog) => blog.user.id === id)

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Blogs Added</h3>
            <ul>
                {blogs.map((blog) => {
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </div>
    )
}

export default SingleUserView
