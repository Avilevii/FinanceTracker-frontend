import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getBalance } from '../api/getBalanceApi.js';
import { FAILED, LOADING, SUCCEEDED } from '../constance.js';

export const fetchBalance = createAsyncThunk(
    'balance/fetchBalance',
    async(id, {rejectWithValue}) => {
        try{
            const data = await getBalance(id)
            return data;

        }
        catch(err){
            return rejectWithValue(err.message || 'balance failed')
        }
    }
)

const initialState = {
  balance: 0,
  status: "idle",
  message: null,
  error: null,
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers:{
        resetStateBalance: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBalance.pending, (state) => {
            state.status = LOADING;
            state.error = null;
        })
        .addCase(fetchBalance.fulfilled, (state, action) => {
            state.status = SUCCEEDED;
            state.balance = action.payload;
        })
        .addCase(fetchBalance.rejected, (state, action) =>{
            state.status = FAILED;
            state.error = action.payload;
        })
    }
})

export const {resetStateBalance} = balanceSlice.actions;
export const selectBalance = (state) => state.balance.balance;
export const selectStatusBalance = (state) => state.balance.status;
export const selectErrorBalance = (state) => state.balance.error;
export default balanceSlice.reducer;