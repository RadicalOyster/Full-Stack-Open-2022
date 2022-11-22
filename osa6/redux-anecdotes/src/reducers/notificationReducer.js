import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
var timeout = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            const notification = action.payload
            return notification
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(updateNotification(message))
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(clearNotification())
        }, (time * 1000))
    }
}

export default notificationSlice.reducer