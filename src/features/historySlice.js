import { createSlice } from "@reduxjs/toolkit";
import {
    getAllHistoryThunk,
    getHistoryByMonthThunk,
    createHistoryThunk,
    updateHistoryThunk,
    deleteHistoryThunk
} from "../thunks/historyThunk";

const initialState = {
  items: [],
  status: "idle",
  message: null,
  error: null,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------- GET ALL ----------
      .addCase(getAllHistoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllHistoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
    })
    .addCase(getAllHistoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- GET ALL BY MONTH ----------
      .addCase(getHistoryByMonthThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getHistoryByMonthThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
    })
    .addCase(getHistoryByMonthThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- CREATE ----------
      .addCase(createHistoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createHistoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload.cretedCategory);
        state.message = action.payload;
      })
      .addCase(createHistoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- UPDATE ----------
      .addCase(updateHistoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateHistoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updated = action.payload.categoryUpdeted;

        const index = state.items.findIndex(({id}) => id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(updateHistoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- DELETE ----------
      .addCase(deleteHistoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteHistoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(({id}) => id !== action.payload.id);
        state.message = action.payload.msg;
      })
      .addCase(deleteHistoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const selectMessage = (state) => state.history.message;
export const selectStatus = (state) => state.history.status;
export const selectError = (state) => state.history.error;
export const selectHistoryItems = (state) => state.history.items;

export default historySlice.reducer;
