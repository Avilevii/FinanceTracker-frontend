import { createSlice } from "@reduxjs/toolkit";

import { fetchLogin, fetchSignUp } from "../thunks/authThunk";
import { FAILED, LOADING, SUCCEEDED } from "../constance";


// ---auth slice---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    message: null,
    status: "idle", 
    error: null,
  },

  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    logout: (state) => {
      state.userId = null;
      state.message = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // ---login case---
      .addCase(fetchLogin.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.userId = action.payload.userId;
        state.message = action.payload.msg;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ---signup case---
      .addCase(fetchSignUp.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.message = action.payload.msg;
        state.userId = action.payload.userId;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
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
