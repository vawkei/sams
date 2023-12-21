import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import productService from "./productService";

const initialProductState = {
    product:null,
    products:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
    isLoggedIn:false
};

//createProduct:
export const createProduct =createAsyncThunk(
    "products/createProduct",async(formData,thunkAPI)=>{
        try{
            return await productService.createProduct(formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//getProducts:
export const getProducts = createAsyncThunk(
    "products/getProducts",async(_,thunkAPI)=>{
        try{
            return await productService.getProducts()
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//getSingleProduct:
export const getSingleProduct = createAsyncThunk(
    "products/getSingleProduct",async(id,thunkAPI)=>{
        try{
            return await productService.getSingleProduct(id)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//updateProduct:
export const updateProduct = createAsyncThunk(
    "products/updateProduct", async({id,formData},thunkAPI)=>{
        try{
            return await productService.updateProduct(id,formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// deleteProduct:
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",async(id,thunkAPI)=>{
        try{
            return await productService.deleteProduct(id)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//review:
export const review = createAsyncThunk(
    "products/review",async({id,formData},thunkAPI)=>{
        try{
            return await productService.deleteProduct(id,formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//deleteReview:
export const deleteReview = createAsyncThunk(
    "products/deleteReview",async(id,thunkAPI)=>{
        try{
            return await productService(id)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//updateReview:
export const updateReview = createAsyncThunk(
    "products/updateReview",async({id,formData},thunkAPI)=>{
        try{
            return await productService(id,formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name:"product",
    initialState:initialProductState,
    reducers:{
        RESET_PRODUCT_STATE(state,action){
            state.isLoading=false;
            state.isError=false;
            state.message="";
            state.isSuccess=false
        }
    },
    extraReducers(builder){
        builder
        //createProduct
        .addCase(createProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
        // .addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message=action.payload.msg
            console.log(action.payload)
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
            console.log(action.payload)
        })

        //getProducts:
        .addCase(getProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload.products;
            console.log(action.payload)
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = false;
            state.isError = true;
            state.products = null;
            console.log(action.payload)
        })

        //getSingleProduct:
        .addCase(getSingleProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess=true
            state.product=action.payload;
            console.log(action.payload)
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError = true
            state.product= null
        })

        //updateProduct:
        .addCase(updateProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.product = action.payload.product;
            state.message = action.payload.msg
            console.log(action.payload)
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading= false;
            state.isError=true;
            state.product = null;
            console.log(action.payload)
        })

        //deleteProduct:
        .addCase(deleteProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message = action.payload
            //toast.success(action.payload)
            console.log(action.payload)
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading= false;
            state.isError=true;
            //toast.success(action.payload)
            console.log(action.payload)
        })
        //review:
        .addCase(review.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(review.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message = action.payload
            //toast.success(action.payload)
            console.log(action.payload)
        })
        .addCase(review.rejected,(state,action)=>{
            state.isLoading= false;
            state.isError=true;
            //toast.success(action.payload)
            console.log(action.payload)
        })
        //deleteReview:
        .addCase(deleteReview.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteReview.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message = action.payload
            //toast.success(action.payload)
            console.log(action.payload)
        })
        .addCase(deleteReview.rejected,(state,action)=>{
            state.isLoading= false;
            state.isError=true;
            //toast.success(action.payload)
            console.log(action.payload)
        })
        
        //updateReview
        .addCase(updateReview.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateReview.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
            //toast.success(action.payload)
            console.log(action.payload)
        })
        .addCase(updateReview.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError=true
            //toast.error(action.payload)
            console.log(action.payload)
        })
    }
});

export default productSlice;
export const productActions = productSlice.actions;