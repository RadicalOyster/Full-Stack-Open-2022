import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote }) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        createAnecdote(anecdote)
    }

    return (
        <div>
            <h2>Add new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote
}

const ConncetedFilter = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConncetedFilter