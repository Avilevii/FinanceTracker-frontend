import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCategoryFetch, deleteCategoryFetch, getAllCategoriesFetch, updateCategoryFetch } from "../api/categoriesApi";

export const getCategoriesThunk = createAsyncThunk(
    'categories/getAllCategories',
    async ({userId}, {rejectWithValue}) => {
        try{
            const data = await getAllCategoriesFetch(userId);
            return data;
        }
        catch(err){
            return rejectWithValue(err.message || 'Get Categories is faild try again later')
        }
    }
)
export const createCategoriesThunk = createAsyncThunk(
    'categories/createCategory',
    async ({newCategory}, {rejectWithValue}) => {
        try{
            const data = await createCategoryFetch(newCategory);
            return data;
        }
        catch(err){
            return rejectWithValue(err.message || 'Create category is faild try again later')
        }
    }
)
export const updateCategoryThunk = createAsyncThunk(
    'categories/updateCategory',
    async ({id, newCategory}, {rejectWithValue}) => {
        try{
            const data = await updateCategoryFetch(id, newCategory);
            return data;
        }
        catch(err){
            return rejectWithValue(err.message || 'update category is faild try again later')
        }
    }
)
export const deleteCategoryThunk = createAsyncThunk(
    'categories/deleteCategory',
    async ({Id}, {rejectWithValue}) => {
        try{
            const data = await deleteCategoryFetch(Id);
            return data;
        }
        catch(err){
            return rejectWithValue(err.message || 'Delete category is faild try again later')
        }
    }
)