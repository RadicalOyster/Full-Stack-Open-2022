import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUsers(state, action) {
            return action.payload
        }
    }
})

export const { updateUsers } = usersSlice.actions

export const setUsers = (users) => {
    return dispatch => {
        dispatch(updateUsers(users))
    }
}

export default usersSlice.reducer