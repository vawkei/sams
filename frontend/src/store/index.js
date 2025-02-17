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
import filteredUserSlice from "./filterUser";
import thunk from "redux-thunk";
//import {combineReducers} from "redux" 
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist" 
import formSlice from "./order/saveOrderToVerify";
import {toast} from "react-toastify"




const initialAuthState = {
 // isLoggedIn: false,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedInLs")) || false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: null,
  users:[],
  message: "",
  showRegForm: true,
  notification:false
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

//getAllUsers:
export const getAllUsers = createAsyncThunk(
  "/getAllUsers",
  async (_, thunkApi) => {
    try {
      return await authService.getAllUsers();
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
//sendContactMail:
export const sendContactMail = createAsyncThunk(
  "auth/sendContactMail", async(formData,thunkApi)=>{
    try{
      return await authService.sendContactMail(formData)
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      return thunkApi.rejectWithValue(message)
    }
  }
);
//newsletterSubscription:
export const newsletterSubscription = createAsyncThunk(
  "auth/newsletterSubscription", async(_,thunkApi)=>{
    try{
      return await authService.newsletterSubscription()
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      return thunkApi.rejectWithValue(message)
    }
  }
);
//sendNewsletter:
export const sendNewsletter = createAsyncThunk(
  "auth/sendNewsletter",async(formData,thunkApi)=>{
    try{
      return await authService.sendNewsletter(formData)
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      return thunkApi.rejectWithValue(message)
    }
  }
);

//clearCart"
export const clearCart = createAsyncThunk(
  "auth/clearCart",async(_,thunkApi)=>{
    try{
      return await authService.clearCart()
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
      return thunkApi.rejectWithValue(message)
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
    UPDATE_NOTIFICATION(state){
      state.notification = false
    },
    RESET_MESSAGE(state){
      state.message = ""
    }
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
        state.isLoggedIn = true; //this shdnt be set to true here
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
        localStorage.setItem("isLoggedInLs",JSON.stringify(state.isLoggedIn));
        state.isSuccess = true;
        state.notification = true;    
        state.user = action.payload.user;
        state.isError = false;
        console.log(action.payload);
        toast.success(action.payload.msg,{position:"top-left"})
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        console.log(action.payload);
        toast.error(action.payload,{position:"top-left"})
      })
      //4:logout:=========================================================
      .addCase(logout.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        localStorage.setItem("isLoggedInLs",JSON.stringify(state.isLoggedIn));
        state.isError = false;
        state.user = null;
        state.message = action.payload;
        state.notification = true;
        state.isSuccess = true;
        console.log(action.payload);
        toast.success(action.payload,{position:"top-left"})
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload,{position:"top-left"})
      })
      //6: forgotPassword:================================================
      .addCase(forgotPassword.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess= true;
        state.message = action.payload.msg;
        toast.success(action.payload.msg,{position:"top-left"})
        console.log(action.payload)
      })
      .addCase(forgotPassword.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload.msg,{position:"top-left"})
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
          toast.success(action.payload.msg,{position:"top-left"})
        })
        .addCase(resetPassword.rejected,(state,action)=>{
          state.isLoading =false;
          state.isError = true;
          console.log(action.payload)
          toast.error(action.payload.msg,{position:"top-left"})
        })
        //getAllUsers======================================================
        .addCase(getAllUsers.pending,(state)=>{
          state.isLoading = true;
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.users=action.payload.users;
          state.isSuccess=true;
          console.log(action.payload)
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
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
        toast.success(action.payload.msg,{position:"top-left"})
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload.msg,{position:"top-left"})
      })
      //10:getLoginStatus:==================================================
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
      //.8:updateUserPhoto:====================================================
      .addCase(updateUserPhoto.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.success("Photo updated",{position:"top-left"})
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error("Failed to update",{position:"top-left"})
      })
      //sendContactMail:=====================================================
      .addCase(sendContactMail.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(sendContactMail.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message =  action.payload.msg;
        console.log(action.payload.msg);
        toast.success(action.payload.msg,{position:"top-left"})
      })
      .addCase(sendContactMail.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload)
        toast.error(action.payload,{position:"top-left"})
      })
      //newsletterSubscription:===================================================
      .addCase(newsletterSubscription.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(newsletterSubscription.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message =  action.payload.msg;
        console.log(action.payload.msg);
        toast.success(action.payload.msg,{position:"top-left"})
      })
      .addCase(newsletterSubscription.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload.msg)
        toast.error(action.payload.msg,{position:"top-left"})
      })
      //sendNewsletter:===================================================
      .addCase(sendNewsletter.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(sendNewsletter.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.message =  action.payload.msg;
        console.log(action.payload.msg);
        toast.success(action.payload.msg,{position:"top-left"})
      })
      .addCase(sendNewsletter.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload.msg)
        toast.error(action.payload.msg,{position:"top-left"})
      })
      //clearCart:=======================================================
      .addCase(clearCart.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(clearCart.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.message = action.payload;
        console.log(action.payload)
      })
      .addCase(clearCart.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload)
      });
  },
});




const formPersistConfig = {
  key: 'form',
  storage,
};

const persistedReducer = persistReducer(formPersistConfig,formSlice.reducer);

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    filterUser: filteredUserSlice.reducer,
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    order: orderSlice.reducer,
    paystack: paystackSlice.reducer,
    form:persistedReducer
  },
  devTools:process.env.NODE_ENV !=="production",
  middleware:[thunk]
  
});

export const authActions = authSlice.actions;
export default store;
