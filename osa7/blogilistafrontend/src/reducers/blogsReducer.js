import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogsSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateBlogs(state, action) {
            return action.payload
        }
    }
})

export const { updateBlogs } = blogsSlice.actions

export const setBlogs = (blogs) => {
    return dispatch => {
        dispatch(updateBlogs(blogs))
    }
}

export default blogsSlice.reducer