import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './Togglable'

const BlogsView = ({ addBlog, user, addLike, deleteBlog, blogFormRef }) => {
    return (
        <div>
            <div style={{marginBottom: '6px'}}>
                <h2>Blogs</h2>
                <div>
                    <Togglable buttonLabel="New blog" ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                </div>
            </div>
            <BlogList user={user} addLike={addLike} deleteBlog={deleteBlog} />
        </div>
    )
}

export default BlogsView
