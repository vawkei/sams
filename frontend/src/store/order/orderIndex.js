import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

const initialOrderState = {
    order:null,
    orders:[],
    adminOrders:[],
    incomingOrder:{},
    newOrderCount:0,
    message:"",
    isSuccess:false,
    isError:false,
    isLoading:false,
    isLoggedIn:false
}

//createOrder
export const createOrder = createAsyncThunk(
    "orders/",async(formData,thunkAPI)=>{
        try{
            return await orderService.createOrder(formData)
        }catch(error){
            const message= (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
//updateOrderWebhook:
export const updateOrderWebhook = createAsyncThunk(
    "orders/updateOrderWebhook",async(webhookResponse,thunkAPI)=>{
        try{
            return await orderService.updateOrderWebhook(webhookResponse)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkAPI.rejectWithValue(message) 
        }
    }
);

//getAdminOrders:
export const getAdminOrders = createAsyncThunk(
    "orders/getAdminOrders",async(_,thunkAPI)=>{
        try{
            return await orderService.getAdminOrders()
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
//getOrders:
export const getOrders = createAsyncThunk(
    "orders/getOrders",async(_,thunkAPI)=>{
        try{
            return await orderService.getOrders()
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//getSingleOrder:
export const getSingleOrder = createAsyncThunk(
    "orders/:id",async(id,thunkAPI)=>{
        try{
            return await orderService.getSingleOrder(id)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//updateOrderStatus:
export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",async({id,formData},thunkAPI)=>{
        try{
            return await orderService.updateOrderStatus(id,formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const orderSlice = createSlice({
    name:"order",
    initialState:initialOrderState,
    reducers:{
        SAVE_ORDER_DATA(state,action){
            const incomingOrderData = action.payload.formData;
            state.incomingOrder = incomingOrderData;
            console.log("babe:",incomingOrderData)
            // localStorage.setItem("formData",JSON.stringify(state.incomingOrder))
        },
        RESET_ORDER_STATE(state){
            state.message = "";
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false
        } ,
        ADD_NEW_ORDER_COUNT(state){
            state.newOrderCount += 1;
             localStorage.setItem("newlyCreatedOrder",state.newOrderCount)
        },
        REMOVE_NEW_ORDER_COUNT(state){
            state.newOrderCount = 0;
            localStorage.setItem("newlyCreatedOrder",state.newOrderCount)
        }  
    },
    extraReducers(builder){
        builder
        // createOrder:
        .addCase(createOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message=action.payload.msg;
            // state.newlyCreatedOrder = action.payload.order;
            console.log(action.payload);
            toast.success(action.payload.msg,{position:"top-left"})
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess=false;
            state.isError = true;
            console.log(action.payload)
            toast.error(action.payload,{position:"top-left"})
        })
        //updateOrderWebhook:
        .addCase(updateOrderWebhook.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateOrderWebhook.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.message = action.payload.msg
            console.log(action.payload);
            toast.success(action.payload.msg)
        })
        .addCase(updateOrderWebhook.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError = true;
            console.log(action.payload)
            toast.error(action.payload)
        })
        // getAdminOrders:
        .addCase(getAdminOrders.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAdminOrders.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.adminOrders = action.payload.allOrders;
            state.message = action.payload.msg
            console.log(action.payload);
        })
        .addCase(getAdminOrders.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload)
        })
        // getOrders:
        .addCase(getOrders.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.orders = action.payload.userOrders;
            state.message = action.payload.msg
            console.log(action.payload);
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload)
        })
        // getSingleOrder:
        .addCase(getSingleOrder.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSingleOrder.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.order = action.payload
        })
        .addCase(getSingleOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            console.log(action.payload)
        })
        // updateOrderStatus:
        .addCase(updateOrderStatus.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.msg;
            console.log(action.payload)
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            console.log(action.payload)
        })
    }
})

export default orderSlice;
export const orderSliceActions = orderSlice.actions;