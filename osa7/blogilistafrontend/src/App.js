//react imports
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

//import components
import BlogsView from './components/BlogsView'
import LoginView from './components/LoginView'
import NavigationMenu from './components/NavigationMenu'
import Notification from './components/Notification'
import SingleBlogView from './components/SingleBlogView'
import SingleUserView from './components/SingleUserView'
import UsersView from './components/UsersView'

//import services
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

//import reducers
import { setBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loggedUserReducer'
import { setUsers } from './reducers/usersReducer'

//import styles
import './styles/styles.css'

const App = () => {
    const dispatch = useDispatch()
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
            dispatch(setUser(JSON.parse(loggedUserJSON)))
            blogService.setToken(JSON.parse(loggedUserJSON).token)
        }
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            const userList = await userService.getAll()
            dispatch(setUsers(userList))
        }

        getUsers()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const loggedUser = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(loggedUser)
            )

            blogService.setToken(loggedUser.token)
            dispatch(setUser(loggedUser))
            setUsername('')
            setPassword('')
            dispatch(setNotification('Logged in', 5, false))
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 5, true))
        }
    }

    const handleLogout = () => {
        dispatch(setNotification('Logged out', 5))
        blogService.clearToken()
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }

    const createBlog = async (newBlog) => {
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

    const addComment = async (event) => {
        event.preventDefault()
        const content = event.target.comment.value
        const id = event.target.blog.value
        const title = event.target.title.value

        const commentToAdd = {
            content: content,
            blog: id,
        }

        await blogService.addComment(commentToAdd)
        const notificationMessage = `Posted a comment to the blog ${title}`
        const blogsList = await blogService.getAll()
        dispatch(setBlogs(blogsList))
        dispatch(setNotification(notificationMessage, 5))

        event.target.comment.value = ''
    }

    //Render the page
    const user = useSelector((state) => state.loggedUser)

    if (user) {
        return (
            <div>
                <Notification />
                <div className="container">
                    <div>
                        <NavigationMenu handleLogout={handleLogout} />

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <BlogsView
                                        createBlog={createBlog}
                                        user={user}
                                        addLike={addLike}
                                        deleteBlog={deleteBlog}
                                        blogFormRef={blogFormRef}
                                    />
                                }
                            />
                            <Route path="/users" element={<UsersView />} />
                            <Route
                                path="/users/:id"
                                element={<SingleUserView />}
                            />
                            <Route
                                path="/blogs/:id"
                                element={
                                    <SingleBlogView
                                        addLike={addLike}
                                        handleDelete={deleteBlog}
                                        addComment={addComment}
                                    />
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Notification />
            <div className="container">
                <LoginView
                    setUsername={setUsername}
                    setPassword={setPassword}
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                />
            </div>
        </div>
    )
}

export default App
