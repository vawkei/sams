// // saveOrdersToVerify.js

import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  incomingOrder:{},
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
 },
});

export const checkoutDetailsFormActions = formSlice.actions;
export default formSlice;



