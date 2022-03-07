import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            if (!action.payload) return initialState
            return action.payload
        },
        hideNotification(state, action) {
            if (action.payload === state) return initialState
            return state
        }
    }
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer