import { createSlice } from '@reduxjs/toolkit'

const initialState = null
var timeout = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            return {
                message: action.payload.message,
                error: action.payload.error
            }
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time, error=false) => {
    return dispatch => {
        dispatch(updateNotification({message: message, error: error}))
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(clearNotification())
        }, (time * 1000))
    }
}

export default notificationSlice.reducer