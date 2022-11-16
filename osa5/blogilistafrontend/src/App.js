import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    const updateBlogs = async () => {
      const blogsList = await blogService.getAll()
      setBlogs(blogsList)
    }

    updateBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Logged in')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
      setErrorMessage(null)
    }

    catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setNotification('Logged out')
    setTimeout(() => {
      setNotification(null)
    }, 2000)
    blogService.clearToken()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      author: author,
      title: title,
      url: url,
      user: user
    }

    try {
      await blogService.createBlog(newBlog)
      const notificationMessage = `Added new blog ${title} by ${author}`
      setTitle('')
      setAuthor('')
      setUrl('')
      const blogsList = await blogService.getAll()
      setBlogs(blogsList)
      setNotification(notificationMessage)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } 
    
    catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  if (user) {
    return (
      <div>
        <Notification message={errorMessage} isError={true} />
        <Notification message={notification} isError={false} />
        <h2>Welcome to the Blogs List!</h2>
        <form onSubmit={handleLogout}>
          <div>Logged in as {user.name} <button type="submit">Logout</button></div>
        </form>
        <div>
          <h3>Create new</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <span className="formspan">Title</span> <input type="text" value={title}
                onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
              <span className="formspan">Author</span> <input type="text" value={author}
                onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
              <span className="formspan">Url</span> <input type="text" value={url}
                onChange={({ target }) => setUrl(target.value)} />
            </div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
        <h3>Blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} isError={true} />
      <Notification message={notification} isError={false} />
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username <input type="text" value={username} name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password <input type="password" value={password} name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default App
