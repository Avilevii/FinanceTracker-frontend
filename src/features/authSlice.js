import { createSlice } from "@reduxjs/toolkit";

import { loginThunk, signUpThunk } from "../thunks/authThunk";
import { FAILED, LOADING, STATUS_SLICE, SUCCEEDED } from "../constants";

// ---auth slice---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    message: null,
    STATUS_SLICE,
    error: null,
  },

  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    logout: (state) => {
      state.userId = null;
      state.message = null;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ---login case---
      .addCase(loginThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.userId = action.payload.userId;
        state.message = action.payload.msg;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ---signup case---
      .addCase(signUpThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.message = action.payload.msg;
        state.userId = action.payload.userId;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      });
  },
});
export const { setUserId, logout } = authSlice.actions;
export const selectMessage = (state) => state.auth.message;
export const selectStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;
export const selectUserId = (state) => state.auth.userId;
export default authSlice.reducer;
