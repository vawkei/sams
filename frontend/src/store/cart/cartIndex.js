import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { getCartQuantityById } from "../../utils/Utils";

const FRONT_URL = process.env.REACT_APP_FRONTEND_URL;
const applyDiscount = (totalAmount, discountPercent) => {
  const x = totalAmount * (discountPercent / 100);
  const y = totalAmount - x;
  return y;
};

const initialCartState = {
  //cartItems:[],
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  //cartTotalQty: 0,
  cartTotalQty: localStorage.getItem("cartTotalQty")
    ? JSON.parse(localStorage.getItem("cartTotalQty"))
    : 0,
  //cartTotalAmount: 0,
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
  ? JSON.parse(localStorage.getItem("cartTotalAmount"))
  : 0,
 // initialCartTotalAmount: 0,
  initialCartTotalAmount: localStorage.getItem("initialCartTotalAmount")
  ? JSON.parse(localStorage.getItem("initialCartTotalAmount"))
  : 0,
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
};

//saveCartDb:
export const saveCartDb = createAsyncThunk(
  "cart/saveCartDb",
  async (formData, thunkApi) => {
    try {
      return await cartService.saveCartDb(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi(message);
    }
  }
);

//getCartDb:
export const getCartDb = createAsyncThunk(
  "cart/getCartDb",
  async (_, thunkApi) => {
    try {
      return await cartService.getCartDb();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    ADD_TO_CART(state, action) {
      const cartqty = getCartQuantityById(state.cartItems, action.payload._id);

      const productIndex = state.cartItems.findIndex((item) => {
        return item._id === action.payload._id;
      });
    

      if (productIndex >= 0) {
        if (cartqty === action.payload.quantity) {
          state.cartItems[productIndex].productCartQty += 0;
          console.log("Maximum Limit reached");
        } else {
          state.cartItems[productIndex].productCartQty += 1;
          console.log("Product increased by 1");
        }
      } else {
        const tempData = { ...action.payload, productCartQty: 1 };
        state.cartItems.push(tempData); //this is where cartItems get inputed. And it has a new property called productCartQty,which has a value of 1.
        console.log(`${action.payload.name} added to cart`);
      }
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex((item) => {
        return item._id === action.payload._id;
      });
      console.log(productIndex);

      if (state.cartItems[productIndex].productCartQty > 1) {
        state.cartItems[productIndex].productCartQty -= 1;
        console.log(`${action.payload.name} decreased by 1`);
      } else {
        const newCartItems = state.cartItems.filter((item) => {
          return item._id !== action.payload._id;
        });
        state.cartItems = newCartItems;
        console.log(`${action.payload.name} removed from cart`);
      }
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_ITEM(state, action) {
      const newItem = state.cartItems.filter((item) => {
        return item._id !== action.payload._id;
      });
      state.cartItems = newItem;
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    RESET_CART(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0
      state.cartTotalQty = 0
      console.log("Cart cleared");
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("cartTotalAmount", JSON.stringify(0));
      localStorage.setItem("initialCartTotalAmount", JSON.stringify(0));
      localStorage.setItem("cartTotalQty", JSON.stringify(0));
      localStorage.removeItem("cartItems");

      console.log("local storage emptied")
    },
    CART_TOTAL_QUANTITY(state) {
      let array = [];
      state.cartItems.map((item) => {
        let lisa = item.productCartQty;
        return array.push(lisa);
      });

      let tempData = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQty = tempData;
      //save to localStorage:
      localStorage.setItem("cartTotalQty", JSON.stringify(state.cartTotalQty));
    },
    CART_TOTAL_AMOUNT(state, action) {
      const lisa = state.cartItems.map((item) => {
        const x = item.price * item.productCartQty;
        return x;
      });
      console.log(lisa);
      const totalAmount = lisa.reduce((a, b) => {
        return a + b;
      }, 0);
      state.initialCartTotalAmount = totalAmount;
      //save to localStorage:
      localStorage.setItem(
        "initialCartTotalAmount",
        JSON.stringify(state.initialCartTotalAmount)
      );


      //const coupon = action.payload;
      console.log(action.payload);
      if (action.payload && action.payload.coupon !== null) {
        const withDiscount = applyDiscount(totalAmount, action.payload.discount);
        state.cartTotalAmount = withDiscount;
        console.log(withDiscount)
      }else{
        state.cartTotalAmount= totalAmount
      } 
      //save to localStorage:
      localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
    },
  },

  extraReducers(builder) {
    builder
      //saveCartDb:
      .addCase(saveCartDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCartDb.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(saveCartDb.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload);
      })
      //getCartDb:
      .addCase(getCartDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartDb.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

        // localStorage.setItem(
        //   "cartItems",
        //   JSON.stringify(action.payload.userCart)
        // );
        // console.log(action.payload.userCart);

        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

        
        if (state.cartItems.length > 0) {
          window.location.href = `${FRONT_URL}/cart`;
        } else {
          window.location.href = `${FRONT_URL}`;
        }
        //whenever getCartDb is called,we will first set our localstorage with the cartItems got frm the db. Then it will check if there is an item in our cart which is coming from our db. if there isan item, it takes us to the cart page. Or if none, then it takes us to home page
      })
      .addCase(getCartDb.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      });
  },
});

export default cartSlice;
export const cartSliceActions = cartSlice.actions;
