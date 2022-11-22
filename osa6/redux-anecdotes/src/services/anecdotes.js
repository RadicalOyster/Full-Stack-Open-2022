import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const newAnecdote = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateAnecdote = async (id) => {
    let anecdote = await axios.get(`${baseUrl}/${id}`)
    anecdote = anecdote.data
    anecdote.votes += 1
    const response = await axios.put(`${baseUrl}/${id}`, anecdote)
    return response.data
}

const exports = {
    getAll,
    createAnecdote,
    updateAnecdote
}

export default exports