import {configureStore} from '@reduxjs/toolkit';
import balanceReducer from '../features/balanceSlice.js';
import authReducer from '../features/authSlice.js';

export const store = configureStore({
    reducer:{
        balance: balanceReducer,
        auth: authReducer,
    }
})