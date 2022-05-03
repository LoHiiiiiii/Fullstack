import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import {
    BrowserRouter as Router,
} from 'react-router-dom'

const store = configureStore({
    reducer: { notification: notificationReducer },
})

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
)
