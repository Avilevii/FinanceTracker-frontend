import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createHistoryFetch,
  delteHistoryFetch,
  getAllHistoryFetch,
  getHistoryByMonthFetch,
  getHistoryByRangeFetch,
  updateHistoryFetch,
} from "../api/historyApi";

export const getAllHistoryThunk = createAsyncThunk(
  "history/getAllHistory",
  async (
    { userId, period, sortCategory, sortTypeCategory, limit, page },
    { rejectWithValue },
  ) => {
    try {
      const data = await getAllHistoryFetch(
        userId,
        period,
        sortCategory,
        sortTypeCategory,
        limit,
        page,
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Get history is faild try again later",
      );
    }
  },
);

export const getHistoryByMonthThunk = createAsyncThunk(
  "history/getHistoryByMonth",
  async (
    { userId, period, month, year, sortCategory, sortTypeCategory, limit, page },
    { rejectWithValue },
  ) => {
    try {
      const data = await getHistoryByMonthFetch(
        userId,
        period,
        month,
        year,
        sortCategory,
        sortTypeCategory,
        limit,
        page,
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Get history is faild try again later",
      );
    }
  },
);

export const getHistoryByRangeThunk = createAsyncThunk(
  "history/getHistoryByRange",
  async (
    { userId, period, startDate, endDate, sortCategory, sortTypeCategory, limit, page },
    { rejectWithValue },
  ) => {
    try {
      const data = await getHistoryByRangeFetch(
        userId,
        period,
        startDate,
        endDate,
        sortCategory,
        sortTypeCategory,
         limit,
         page
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "Get history is faild try again later",
      );
    }
  },
);

export const createHistoryThunk = createAsyncThunk(
  "history/createHistory",
  async (newHistory, { rejectWithValue }) => {
    try {
      const data = await createHistoryFetch(newHistory);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "create history is faild try again later",
      );
    }
  },
);

export const updateHistoryThunk = createAsyncThunk(
  "history/updateHistory",
  async ({ id, newHistory }, { rejectWithValue }) => {
    try {
      const data = await updateHistoryFetch(id, newHistory);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "update history is faild try again later",
      );
    }
  },
);

export const deleteHistoryThunk = createAsyncThunk(
  "history/deleteHistory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const data = await delteHistoryFetch(id);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "delte history is faild try again later",
      );
    }
  },
);
