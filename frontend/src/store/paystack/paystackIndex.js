import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paystackService from "./paystackService";
import { toast } from "react-toastify";



const initialPaystackState = {
  message: "",
  iSuccess: false,
  isError: false,
  isLoading: false,
  isLoggedIn: false,
  webhookResponse:null,
  paymentUrl: "",
};

//acceptpayment
export const acceptpayment = createAsyncThunk(
  "acceptpayment/",
  async (formData, thunkAPI) => {
    try {
      return await paystackService.acceptpayment(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//verifypayment:
export const verifypayment = createAsyncThunk(
  //"verifypayment/",
  "verifypayment/",
  async (reference, thunkAPI) => {
    try {
      return await paystackService.verifypayment(reference);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//getWebhookEvent:
export const getWebhookEvent = createAsyncThunk(
  "/getWebhookEvent",async(_,thunkAPI)=>{
    try{
      return await paystackService.getWebhookEvent()
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg)  || error.msg || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//refundOrder:
export const refundOrder = createAsyncThunk(
  "/refundOrder",async(formData,thunkAPI)=>{
    try{
      return await paystackService.refundOrder(formData)
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const paystackSlice = createSlice({
  name: "paystack",
  initialState: initialPaystackState,
  reducers: {
    SAVE_ORDER_DATA(state, action) {
      const checkoutData = action.payload.formData;
      console.log(checkoutData);
      //state.checkoutDatass = checkoutData;
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
    RESET_PAYMENT_URL(state,action){
      state.paymentUrl = ""
    }
  },
  extraReducers(builder) {
    builder
      //acceptpayment:
      .addCase(acceptpayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptpayment.fulfilled, (state, action) => {

        state.isLoading = false;
        state.iSuccess = true;
        state.message = "Payment initiated";
        state.paymentUrl = action.payload.paymentUrl;
        // window.location.href = action.payload.paymentUrl;
        setTimeout(() => {
          window.location.href = action.payload.paymentUrl;
       }, 5000);
        console.log(action.payload);
      })
      .addCase(acceptpayment.rejected, (state, action) => {
        state.isLoading = false;
        state.iSuccess = false;
        state.isError = true;
        console.log(action.payload);
      })
      //verifypayment
      .addCase(verifypayment.pending, (state) => {
        state.isLoading = true;
        state.iSuccess = false;
      })
      .addCase(verifypayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.iSuccess = true;
        state.message = action.payload.msg;
        
        console.log(action.payload);
      })
      .addCase(verifypayment.rejected, (state, action) => {
        state.isLoading = false;
        state.iSuccess = false;
        state.isError = true;
        state.message = action.error.message || "Unknown error occurred";
        console.log(action.payload);
      })
      //getWebhookEvent:
      .addCase(getWebhookEvent.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(getWebhookEvent.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.webhookResponse = action.payload.webhooks;
        state.message = action.payload.msg;
        console.log(action.payload)
      })
      .addCase(getWebhookEvent.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload)
      })
      //refundOrder:
      .addCase(refundOrder.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(refundOrder.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.iSuccess = true;
        state.message = action.payload.msg;
        console.log(action.payload)
        toast.success(action.payload.msg,{position:"top-left"})
      })
      .addCase(refundOrder.rejected,(state,action)=>{
        state.isLoading = false;
        state.iSuccess = false;
        state.message = action.payload.msg
        console.log(action.payload)
        toast.error(action.payload,{position:"top-left"})
      })
  },
});

export default paystackSlice;
export const paystackSliceAction = paystackSlice.actions;

