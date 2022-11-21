import { createSlice } from '@reduxjs/toolkit'

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

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newAnecdote(state, action) {
      const anecdote = action.payload
      state.push({
        content: anecdote,
        id: getId(),
        votes: 0
      })
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return sorted(state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote))
    }
  }
})

export const { newAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer