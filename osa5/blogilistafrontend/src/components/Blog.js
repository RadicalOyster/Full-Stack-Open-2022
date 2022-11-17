import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpansion = () => {
    setExpanded(!expanded)
  }


  return (
    <div className="blogFrame">
      <div>
        <span className="clickableText" onClick={toggleExpansion}>{blog.title}</span> | {blog.author}
      </div>
      <div style={showWhenExpanded}>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button className="marginButton" onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={handleDelete}>Delete blog</button>
      </div>
    </div>
  )
}

export default Blog