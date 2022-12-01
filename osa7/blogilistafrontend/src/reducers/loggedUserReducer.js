import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userSlice = createSlice({
    name: 'loggedUser',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state, action) {
            return null
        }
    }
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer