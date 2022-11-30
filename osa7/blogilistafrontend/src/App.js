import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import { setBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import './App.css'

const App = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {
        const getBlogs = async () => {
            const blogsList = await blogService.getAll()
            dispatch(setBlogs(blogsList))
        }

        getBlogs()
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
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            dispatch(setNotification('Logged in', 5, false))
        } catch (exception) {
            dispatch(setNotification('wrong credentials', 5, true))
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(setNotification('Logged out', 5))
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
            dispatch(setBlogs(blogsList))
            dispatch(setNotification(notificationMessage, 5))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 5, true))
        }
    }

    const addLike = async (blog) => {
        try {
            const updatedBlog = Object.assign({}, blog)
            updatedBlog.likes = updatedBlog.likes + 1
            await blogService.addLike(updatedBlog)
            const blogsList = await blogService.getAll()
            dispatch(setBlogs(blogsList))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error, 5, true))
        }
    }

    const deleteBlog = async (blog) => {
        if (
            window.confirm(
                `Permanently delete blog ${blog.title} by ${blog.author}?`
            )
        ) {
            try {
                await blogService.deleteBlog(blog)
                const blogsList = await blogService.getAll()
                dispatch(setBlogs(blogsList))
                dispatch(
                    setNotification(
                        `Deleted blog ${blog.title} by ${blog.author}`,
                        5
                    )
                )
            } catch (exception) {
                dispatch(
                    setNotification(exception.response.data.error, 5, true)
                )
            }
        }
    }

    //Render the page
    if (user) {
        return (
            <div>
                <Notification />
                <h2>Welcome to the Blogs List!</h2>
                <form onSubmit={handleLogout}>
                    <div>
                        Logged in as {user.name}{' '}
                        <button className="logoutButton" type="submit">
                            Logout
                        </button>
                    </div>
                </form>
                <div>
                    <Togglable buttonLabel="New blog" ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                </div>
                <div>
                    <h3>Blogs</h3>
                </div>
                <BlogList user={user} addLike={addLike} deleteBlog={deleteBlog} />
            </div>
        )
    }

    return (
        <div>
            <Notification />
            <h1>Login</h1>
            <Togglable buttonLabel="Log in">
                <LoginForm
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                />
            </Togglable>
        </div>
    )
}

export default App
