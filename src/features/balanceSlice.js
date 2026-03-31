import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getBalanceApi } from "../api/getBalanceApi.js";
import { FAILED, LOADING, STATUS_SLICE, SUCCEEDED } from "../constants.js";

export const balanceThunk = createAsyncThunk(
  "balance/fetchBalance",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getBalanceApi(id);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "balance failed");
    }
  },
);

const initialState = {
  balance: 0,
  STATUS_SLICE,
  message: null,
  error: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    resetStateBalance: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(balanceThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(balanceThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.balance = action.payload;
      })
      .addCase(balanceThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      });
  },
});

export const { resetStateBalance } = balanceSlice.actions;
export const selectBalance = (state) => state.balance.balance;
export const selectStatusBalance = (state) => state.balance.status;
export const selectErrorBalance = (state) => state.balance.error;
export default balanceSlice.reducer;
