import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import authService from "./authService";
import categorySlice from "./category/categoryIndex";
import productSlice from "./product/productIndex";
import filterSlice from "./product/FilterProduct";
import cartSlice from "./cart/cartIndex";
import couponSlice from "./coupon/couponIndex";
import orderSlice from "./order/orderIndex";
import paystackSlice from "./paystack/paystackIndex";

const initialAuthState = {
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: null,
  message: "",
  showRegForm: true,
};

//register:
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//verifyEmail:
export const verifyEmail = createAsyncThunk(
  "/verifyEmail",
  async ({ verificationToken, email }, thunkApi) => {
    try {
      return await authService.verifyEmail(verificationToken, email);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//login:
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//logout:
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.msg ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

//forgotPassword:
export const forgotPassword = createAsyncThunk(
  "/forgotPassword",
  async (formData, thunkApi) => {
    try {
      return await authService.forgotPassword(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//resetPassword:
export const resetPassword = createAsyncThunk(
  "/resetPassword",
  async (formData, thunkApi) => {
    try {
      return await authService.resetPassword(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//getSingleUser:
export const getSingleUser = createAsyncThunk(
  "auth/getSingleUser",
  async (_, thunkApi) => {
    try {
      return await authService.getSingleUser();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//updateUser:
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkApi) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//getLoginStatus:
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkApi) => {
    try {
      await authService.getLoginStatus();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//uploadUserPhoto:
// export const uploadUserPhoto = createAsyncThunk(
//     "api/uploadUserPhoto",async(userData,thunkApi)=>{
//         try {
//            return await authService.uploadUserPhoto(userData)
//         }catch(error){
//             const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// );
//updateUserPhoto:
export const updateUserPhoto = createAsyncThunk(
  "auth/updateUserPhoto",
  async (userData, thunkApi) => {
    try {
      return await authService.updateUserPhoto(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    RESET_AUTH(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = " ";
    },
  },
  extraReducers: (builder) => {
    builder
      //1:register:=========================================================
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.showRegForm = false;
        state.user = action.payload;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        //state.isSuccess=action.payload;
        state.user = null;
        state.message = action.payload;
        console.log(action.payload);
      })
      //2.verifyEmail:========================================================
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      //3:login:==============================================================
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.message = action.payload;
        //state.user = action.payload
        state.user = action.payload.user;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        console.log(action.payload);
      })
      //4:logout:=========================================================
      .addCase(logout.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.isError = false;
        state.user = null;
        state.message = action.payload;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      //6: forgotPassword:================================================
      .addCase(forgotPassword.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess= true;
        state.message = action.payload.msg;
        console.log(action.payload)
      })
      .addCase(forgotPassword.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload)
      })
      //7resetPassword:===================================================
        .addCase(resetPassword.pending,(state)=>{
          state.isLoading = true
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.isSuccess = true;
          console.log(action.payload)
        })
        .addCase(resetPassword.rejected,(state,action)=>{
          state.isLoading =false;
          state.isError = true;
          console.log(action.payload)
        })
      //8:getSingleUser:===================================================
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.message = action.payload;
        //console.log(action.payload)
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
        //console.log(action.payload)
      })
      //9:updateUser:======================================================
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.message = action.payload.msg;
        console.log(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //10:getLoginStatus:
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = action.payload;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        console.log(action.payload);
      })
      //uploadUserPhoto:
      // .addCase(uploadUserPhoto.pending,(state,action)=>{
      //     state.isLoading=true;
      // })
      // .addCase(uploadUserPhoto.fulfilled,(state,action)=>{
      //     state.isLoading=false;
      //     state.isLoggedIn=true;
      //     state.isSuccess=true;
      //     state.message = action.payload
      //     console.log(action.payload)
      // })
      // .addCase(uploadUserPhoto.rejected,(state,action)=>{
      //     state.isLoading=false;
      //     state.isError=true;
      //     state.message=action.payload;
      //     console.log(action.payload)
      // })
      //.8:updateUserPhoto:
      .addCase(updateUserPhoto.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      });
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    order: orderSlice.reducer,
    paystack: paystackSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export default store;
