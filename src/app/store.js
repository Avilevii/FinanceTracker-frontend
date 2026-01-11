import {configureStore} from '@reduxjs/toolkit';
import balanceReducer from '../features/balanceSlice.js';
import authReducer from '../features/authSlice.js';
import categoriesReducer from '../features/categoriesSlice.js';
import historyReducer from '../features/historySlice.js'

export const store = configureStore({
    reducer:{
        balance: balanceReducer,
        auth: authReducer,
        categories: categoriesReducer,
        history: historyReducer,
    }
})