// // saveOrdersToVerify.js

import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  incomingOrder:{},
  payWithPaystack:true
}

const formSlice = createSlice({
 name: "form",
 initialState: initialFormState,
 reducers: {
    SAVE_CHECKOUT_DETAILS_DATA(state, action) {
      const incomingOrderData = action.payload.formData;
      state.incomingOrder = incomingOrderData;
      console.log("babe:", incomingOrderData);
    },
    PAY_WITH_PAYSTACK_BOOLEAN(state,action){
        state.payWithPaystack = action.payload
    }
 },
});

export const checkoutDetailsFormActions = formSlice.actions;
export default formSlice;



