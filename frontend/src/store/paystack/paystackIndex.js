import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paystackService from "./paystackService";

const FRONT_URL = process.env.REACT_APP_FRONTEND_URL;

const initialPaystackState = {
  message: "",
  iSuccess: false,
  isError: false,
  isLoading: false,
  isLoggedIn: false,
  orders:[]
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
  "verifypayment/:reference",
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

const paystackSlice = createSlice({
  name: "paystack",
  initialState: initialPaystackState,
  reducers: {
    SAVE_ORDER_DATA(state,action){
        const orders = action.payload
        console.log(orders);
        state.orders = action.payload
    }
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
        //window.location.href = action.payload.paymentUrl;
        // state.message = "Order created";
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
      })
      .addCase(verifypayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.iSuccess = true;
        // state.message =
        //   action.payload.msg === "Payment verified successfully"
        //     ? "Payment verified successfully"
        //     : "Unknown error occurred";
        if(action.payload.msg==="Payment verified successfully"){
            state.message = "Honor Blackman is Pussy Galore"
        }else{
            state.message = "Unknown error occurred"
        };
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
      });
  },
});

export default paystackSlice;
export const paystackSliceAction = paystackSlice.actions;
