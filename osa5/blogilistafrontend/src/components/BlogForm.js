import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <span className="formspan">Title</span> <input type="text" value={title}
            onChange={handleTitleChange} />
        </div>
        <div>
          <span className="formspan">Author</span> <input type="text" value={author}
            onChange={handleAuthorChange} />
        </div>
        <div>
          <span className="formspan">Url</span> <input type="text" value={url}
            onChange={handleUrlChange} />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm