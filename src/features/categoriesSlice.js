import { createSlice } from "@reduxjs/toolkit";

import {
  getCategoriesThunk,
  createCategoriesThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "../thunks/categoriesThunk";
import { FAILED, LOADING, SUCCEEDED } from "../constance";

const initialState = {
  items: [],
  status: "idle",
  message: null,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetStateCategories: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ----------- GET ALL ----------
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ----------- CREATE ----------
      .addCase(createCategoriesThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(createCategoriesThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const newCategory = action.payload.cretedCategory;
        state.items.push(newCategory);
        state.message = action.payload.msg;
      })
      .addCase(createCategoriesThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ----------- UPDATE ----------
      .addCase(updateCategoryThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const updated = action.payload.categoryUpdeted;

        const index = state.items.findIndex(({ id }) => id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      })

      // ----------- DELETE ----------
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.items = state.items.filter(({ id }) => id !== action.payload.id);
        state.message = action.payload.msg;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.payload;
      });
  },
});

export const { resetStateCategories } = categoriesSlice.actions;
export const selectMessage = (state) => state.categories.message;
export const selectStatus = (state) => state.categories.status;
export const selectError = (state) => state.categories.error;
export const selectCategories = (state) => state.categories.items;

export default categoriesSlice.reducer;
