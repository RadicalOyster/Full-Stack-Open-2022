import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
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

  const blogFormRef = useRef()



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

  const addBlog = async (newBlog) => {
    try {
      await blogService.createBlog(newBlog)
      const notificationMessage = `Added new blog ${newBlog.title} by ${newBlog.author}`
      blogFormRef.current.toggleVisibility()
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

  const addLike = async (blog) => {
    try {
      const updatedBlog = Object.assign({}, blog)
      updatedBlog.likes = updatedBlog.likes + 1
      await blogService.addLike(updatedBlog)
      const blogsList = await blogService.getAll()
      setBlogs(blogsList)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Permanently delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog)
        const blogsList = await blogService.getAll()
        setBlogs(blogsList)
        setNotification(`Deleted blog ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  //Sort blogs by number of likes
  blogs.sort((blog1, blog2) => (blog1.likes > blog2.likes) ? -1 : 1)

  //Render the page
  if (user) {
    return (
      <div>
        <Notification message={errorMessage} isError={true} />
        <Notification message={notification} isError={false} />
        <h2>Welcome to the Blogs List!</h2>
        <form onSubmit={handleLogout}>
          <div>Logged in as {user.name} <button className='logoutButton' type='submit'>Logout</button></div>
        </form>
        <div>
          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>
        <div>
          <h3>Blogs</h3>
        </div>
        <div className='blogsContainer'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleLike={() => addLike(blog)} handleDelete={() => deleteBlog(blog)} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} isError={true} />
      <Notification message={notification} isError={false} />
      <h1>Login</h1>
      <Togglable buttonLabel='Log in'>
        <LoginForm
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )
}

export default App
