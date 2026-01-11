import { createSlice } from "@reduxjs/toolkit";
import {
  getCategoriesThunk,
  createCategoriesThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "../thunks/categoriesThunk";

const initialState = {
  items: [],
  status: "idle",
  message: null,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------- GET ALL ----------
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
    })
    .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- CREATE ----------
      .addCase(createCategoriesThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCategoriesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newCategory = action.payload.cretedCategory;
        state.items = state.items.filter(({userId, iconName}) => {
          return  !(userId === 0 && iconName === newCategory.iconName);
        })
        state.items.push(newCategory);
        state.message = action.payload.msg;
      })
      .addCase(createCategoriesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- UPDATE ----------
      .addCase(updateCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updated = action.payload.categoryUpdeted;

        const index = state.items.findIndex(({id}) => id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ----------- DELETE ----------
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(({id}) => id !== action.payload.id);
        state.message = action.payload.msg;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const selectMessage = (state) => state.categories.message;
export const selectStatus = (state) => state.categories.status;
export const selectError = (state) => state.categories.error;
export const selectItems = (state) => state.categories.items;

export default categoriesSlice.reducer;
