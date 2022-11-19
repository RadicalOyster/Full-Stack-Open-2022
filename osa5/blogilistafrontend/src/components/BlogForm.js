import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          <span className='formspan'>Title</span> <input id='title' placeholder='Title' type='text' value={title}
            onChange={handleTitleChange} />
        </div>
        <div>
          <span className='formspan'>Author</span> <input id='author' placeholder='Author' type='text' value={author}
            onChange={handleAuthorChange} />
        </div>
        <div>
          <span className='formspan'>Url</span> <input id='url' placeholder='Url' type='text' value={url}
            onChange={handleUrlChange} />
        </div>
        <br />
        <button id='submitBlog' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default BlogForm