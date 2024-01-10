import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialCategoryState = {
    category:null,
    categories:[],
    message:"",
    isSuccess:false,
    isError:false,
    isLoading:false,
    isLoggedIn:false
};

//createCategory:
export const createCategory = createAsyncThunk(
    "categories/",async(formData,thunkAPI)=>{
        try{
            return await categoryService.createCategory(formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//getCategories:
export const getCategories = createAsyncThunk(
    "categories/getCategories",async(_,thunkAPI)=>{
        try{
            return await categoryService.getCategories()
        }catch(error){
            const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//getSingleCategory:
export const getSingleCategory = createAsyncThunk(
    "categories/getSingleCategory",async(id,thunkAPI)=>{
        try{
            return await categoryService.getSingleCategory(id)
        }
        catch(error){
            const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//deleteCategory:
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",async(slug,thunkAPI)=>{
        try{
            return await categoryService.deleteCategory(slug)
        }catch(error){
            const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);


const categorySlice = createSlice({
    name:'category',
    initialState:initialCategoryState,
    reducers:{},
    extraReducers(builder){
        builder
        //createCategory:
        .addCase(createCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.message = action.payload.msg;
            //toast.success(action.payload.msg)
            console.log(action.payload)
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            //toast.error(action.payload);
            console.log(action.payload)
        })
        //getCategories:
        .addCase(getCategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCategories.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.categories = action.payload.categories;
            state.isSuccess = true;
            console.log(action.payload)
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.categories = [];
            //toast.error(action.payload)
            console.log(action.payload)
        })
        //getSingleCategory:
        .addCase(getSingleCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.category = action.payload;
            console.log(action.payload);
        })
        .addCase(getSingleCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.category = null;
            state.isError=true;
            //toast.error(action.payload)
            console.log(action.payload)
        })
        //deleteCategory:
        .addCase(deleteCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = true;
            //toast.success(action.payload)
            console.log(action.payload)
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            //toast.error(action.payload);
            console.log(action.payload)
        })
    }
});

export default categorySlice;
export  const categoryActions = categorySlice.actions 