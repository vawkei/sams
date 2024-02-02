import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paystackService from "./paystackService";

const FRONT_URL = process.env.REACT_APP_FRONTEND_URL;

const initialPaystackState = {
  message: "",
  iSuccess: false,
  isError: false,
  isLoading: false,
  isLoggedIn: false,
  orders: [],
  posthook:[]
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
//postWebhook
export const postWebhook = createAsyncThunk(
  "postWebhook/",
  async (_, thunkAPI) => {
    try {
      return await paystackService.postWebhook();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const paystackSlice = createSlice({
  name: "paystack",
  initialState: initialPaystackState,
  reducers: {
    SAVE_ORDER_DATA(state, action) {
      const orders = action.payload;
      console.log(orders);
      state.orders = action.payload;
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
  },
  extraReducers(builder) {
    builder
      //acceptpayment:
      .addCase(acceptpayment.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(acceptpayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.iSuccess = true;
        state.message = "Payment initiated";
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
        // if(action.payload.msg==="Payment verified successfully"){
        //     state.message = "Honor Blackman is Pussy Galore"
        // }else{
        //     state.message = "Unknown error occurred"
        // };
        // if (action.payload.msg === "Payment verified successfully") {
        //   window.location.href = `${FRONT_URL}/checkout`;
        // }
        console.log(action.payload);
      })
      .addCase(verifypayment.rejected, (state, action) => {
        state.isLoading = false;
        state.iSuccess = false;
        state.isError = true;
        state.message = action.error.message || "Unknown error occurred";
        console.log(action.payload);
      })
      //postWebhook:
      .addCase(postWebhook.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(postWebhook.fulfilled,(state,action)=>{
        state.isLoading = true;
        state.iSuccess=true;
        state.message = action.payload;
        state.posthook = action.payload
        console.log(action.payload)
      })
      .addCase(postWebhook.rejected,(state,action)=>{
        state.isLoading =false;
        state.isError=true;
        state.iSuccess=false
        console.log(action.payload)
      })
  },
});

export default paystackSlice;
export const paystackSliceAction = paystackSlice.actions;

// .addCase(verifypayment.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.iSuccess = true;

//   if (action.payload.msg === "Payment verified successfully") {
//     // Redirect to a success page or handle accordingly
//     window.location.href = `${FRONT_URL}/success`;
//   } else {
//     state.message = "Unknown error occurred";
//   }

//   console.log(action.payload);
// })
