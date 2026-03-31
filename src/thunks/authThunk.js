import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginApi, signUpApi } from "../api/authApi";

export const loginThunk = createAsyncThunk(
  "login/fetchlogin",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const data = await loginApi(userName, password);

      localStorage.setItem("userId", data.userId);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed try again later");
    }
  },
);

export const signUpThunk = createAsyncThunk(
  "SignUp/fetchSignUp",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const data = await signUpApi(userName, password);
      localStorage.setItem("userId", data.userId);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed try again later");
    }
  },
);
