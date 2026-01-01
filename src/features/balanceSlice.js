import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance } from '../api/getBalanceApi.js';

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

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        balance:0,
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBalance.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchBalance.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.balance = action.payload;
        })
        .addCase(fetchBalance.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})
export const selectBalance = (state) => state.balance.balance;
export const selectStatus = (state) => state.balance.status;
export const selectError = (state) => state.balance.error;
export default balanceSlice.reducer;