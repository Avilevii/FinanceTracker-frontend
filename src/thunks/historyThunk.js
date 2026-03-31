import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createHistoryApi,
  delteHistoryApi,
  getAllHistoryApi,
  getHistoryByMonthApi,
  getHistoryByRangeApi,
  updateHistoryApi,
} from "../api/historyApi";

export const getAllHistoryThunk = createAsyncThunk(
  "history/getAllHistory",
  async (
    { userId, period, sortCategory, sortTypeCategory, limit, page },
    { rejectWithValue },
  ) => {
    try {
      const data = await getAllHistoryApi(
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
    {
      userId,
      period,
      month,
      year,
      sortCategory,
      sortTypeCategory,
      limit,
      page,
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await getHistoryByMonthApi(
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
    {
      userId,
      period,
      startDate,
      endDate,
      sortCategory,
      sortTypeCategory,
      limit,
      page,
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await getHistoryByRangeApi(
        userId,
        period,
        startDate,
        endDate,
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

export const createHistoryThunk = createAsyncThunk(
  "history/createHistory",
  async (newHistory, { rejectWithValue }) => {
    try {
      const data = await createHistoryApi(newHistory);

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
      const data = await updateHistoryApi(id, newHistory);

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
      const data = await delteHistoryApi(id);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.message || "delte history is faild try again later",
      );
    }
  },
);
