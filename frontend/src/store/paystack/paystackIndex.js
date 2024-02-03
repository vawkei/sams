import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paystackService from "./paystackService";

const FRONT_URL = process.env.REACT_APP_FRONTEND_URL;

const initialPaystackState = {
  message: "",
  iSuccess: false,
  isError: false,
  isLoading: false,
  isLoggedIn: false,
  checkoutDatass: {},
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

const paystackSlice = createSlice({
  name: "paystack",
  initialState: initialPaystackState,
  reducers: {
    SAVE_ORDER_DATA(state, action) {
      const checkoutData = action.payload.formData;
      console.log(checkoutData);
      state.checkoutDatass = checkoutData;
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
        // state.isLoading = true;
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
      });
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
