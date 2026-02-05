import { createSlice } from "@reduxjs/toolkit";
import {
  getAllHistoryThunk,
  getHistoryByMonthThunk,
  createHistoryThunk,
  updateHistoryThunk,
  deleteHistoryThunk,
  getHistoryByRangeThunk,
} from "../thunks/historyThunk";
import { FAILED, LOADING, SUCCEEDED } from "../constance";

const initialState = {
  items: [],
  filteredItems: [],
  status: "idle",
  message: null,
  error: null,
  limit: 10,
  page: 1,
  hasMore: true,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetStateHistory: () => initialState,

    resetHistoryItems: (state) => {
      state.items = [];
    },

    resetFilteredHistory: (state) => {
      state.filteredItems = [];
    },

    nextPage: (state) => {
      state.page += 1;
    },

    resetPage: (state) => {
      state.page = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      // ----------- GET ALL ----------
      .addCase(getAllHistoryThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(getAllHistoryThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(getAllHistoryThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ----------- GET ALL BY MONTH ----------
      .addCase(getHistoryByMonthThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(getHistoryByMonthThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.filteredItems = action.payload;
      })
      .addCase(getHistoryByMonthThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
        state.filteredItems = [];
      })

      // ----------- GET ALL BY RANGE ----------
      .addCase(getHistoryByRangeThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(getHistoryByRangeThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.filteredItems = action.payload;
      })
      .addCase(getHistoryByRangeThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
        state.filteredItems = [];
      })

      // ----------- CREATE ----------
      .addCase(createHistoryThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(createHistoryThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.items.push(action.payload.createdHistory);
        state.message = action.payload.msg;
      })
      .addCase(createHistoryThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ----------- UPDATE ----------
      .addCase(updateHistoryThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(updateHistoryThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const updated = action.payload.updatedHistory;

        const index = state.items.findIndex(({ id }) => id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }

        state.msg = action.payload.msg;
      })
      .addCase(updateHistoryThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ----------- DELETE ----------
      .addCase(deleteHistoryThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(deleteHistoryThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.items = state.items.filter(({ id }) => id !== action.payload.id);
        state.message = action.payload.msg;
      })
      .addCase(deleteHistoryThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      });
  },
});

export const { resetStateHistory, resetHistoryItems, resetFilteredHistory } =
  historySlice.actions;
export const selectMessage = (state) => state.history.message;
export const selectStatus = (state) => state.history.status;
export const selectError = (state) => state.history.error;
export const selectHistoryItems = (state) => state.history.items;
export const selectHistoryByfilter = (state) => state.history.filteredItems;

export default historySlice.reducer;
