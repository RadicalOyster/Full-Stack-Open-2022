import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
    const blogs = [...useSelector((state) => state.blogs)]
    console.log(blogs)
    
    if (!blogs) {
        return <div></div>
    }

    blogs.sort((blog1, blog2) => (blog1.likes > blog2.likes ? -1 : 1))

    return (
        <div className="blogsContainer">
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    handleLike={() => addLike(blog)}
                    handleDelete={() => deleteBlog(blog)}
                />
            ))}
        </div>
    )
}

export default BlogList
