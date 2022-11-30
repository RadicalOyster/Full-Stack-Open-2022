import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const clearToken = () => {
    token = null
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const createBlog = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const addLike = async (updatedBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(
        `${baseUrl}/${updatedBlog.id}`,
        updatedBlog,
        config
    )
    return response.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response
}

export default { getAll, createBlog, setToken, clearToken, addLike, deleteBlog }
