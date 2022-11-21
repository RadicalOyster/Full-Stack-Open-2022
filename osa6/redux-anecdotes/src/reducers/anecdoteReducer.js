const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sorted = (state) => {
  return state.sort((anecdote1, anecdote2) => (anecdote1.votes < anecdote2.votes ? 1 : anecdote1.votes === anecdote2.votes ? 0 : -1))
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        content: anecdoteToVote.content,
        id: anecdoteToVote.id,
        votes: anecdoteToVote.votes + 1
      }
      return sorted(state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ))
    case 'NEW_ANECDOTE':
      const newAnecdote = {
        content: action.data.anecdote,
        id: getId(),
        votes: 0
      }
      return sorted(state.concat(newAnecdote))
    default:
      return sorted(state)
  }
}

export const newAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { anecdote }
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export default reducer