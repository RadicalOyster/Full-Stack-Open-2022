import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const sorted = (state) => {
  return state.sort((anecdote1, anecdote2) => (anecdote1.votes < anecdote2.votes ? 1 : anecdote1.votes === anecdote2.votes ? 0 : -1))
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return sorted(state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
      return
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return {...anecdote, votes: action.payload.votes}
        }

        return anecdote
      })
    }
  }
})

export const { newAnecdote, addVote, appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(id)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer