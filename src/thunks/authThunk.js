import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLoginFetch, postSignUpFetch } from "../api/authApi";

export const fetchLogin = createAsyncThunk(
  "login/fetchlogin",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const data = await postLoginFetch(userName, password);
      
      localStorage.setItem('userId', data.userId)

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed try again later");
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "SignUp/fetchSignUp",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const data = await postSignUpFetch(userName, password);
      localStorage.setItem("userId", data.userId);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed try again later");
    }
  }
);
