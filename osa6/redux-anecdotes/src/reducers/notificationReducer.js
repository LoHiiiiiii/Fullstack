import { createSlice } from '@reduxjs/toolkit'

const initialState = ""
let timeoutId = ""

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) { return action.payload },
        hideNotification(state, action) { return initialState }
    }
})

export const { setNotification, hideNotification } = notificationSlice.actions

export const showNotification = (content, duration) => {
    return (dispatch) => {
        if (timeoutId) clearTimeout(timeoutId)

        timeoutId = duration && duration > 0
            ? setTimeout(() => {
                dispatch(hideNotification())
            }, duration)
            : ""
       
        dispatch(setNotification(content))
    }
}

export default notificationSlice.reducer