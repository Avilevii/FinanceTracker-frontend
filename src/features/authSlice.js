import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchSignUp } from "../thunks/authThunk";


const loading = 'loading';
const succeeded = 'succeeded';
const failed = 'failed';
// ---auth slice---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    message: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---login case---
      .addCase(fetchLogin.pending, (state) => {
        state.status = loading;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = succeeded;
        state.userId = action.payload.userId;
        state.message = action.payload.msg;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = failed;
        state.error = action.payload;
      })

      // ---signup case---
      .addCase(fetchSignUp.pending, (state) => {
        state.status = loading;
        state.error = null;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = succeeded;
        state.message = action.payload.msg;
        state.userId = action.payload.userId;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.status = failed;
        state.error = action.payload;
      });
  },
});
export const selectMessage = (state) => state.auth.message;
export const selectStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;
export const selectUserId = (state) => state.auth.userId;
export default authSlice.reducer;
