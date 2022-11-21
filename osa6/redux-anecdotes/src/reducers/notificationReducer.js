import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer