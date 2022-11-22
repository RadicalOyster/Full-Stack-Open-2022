import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

var timeout = undefined

const AnecdoteList = (props) => {
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteForAnecdote(id))
        dispatch(setNotification((`You voted for the anecdote ${content}`), 3))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList