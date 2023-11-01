import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import authService from "./authService";

const initialAuthState = {
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: null,
  message: "",
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
        return thunkApi.rejectWithValue(message)
    };
  }
);
//login:
export const login = createAsyncThunk(
    "auth/login",async(userData,thunkApi)=>{
        try{
            return await authService.login(userData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }       
    }
);
//logout:
export const logout = createAsyncThunk(
    "auth/logout",async(_,thunkApi)=>{
        try{
           return await authService.logout();
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkApi.rejectWithValue(message)
        }       
    }
);
//getSingleUser:
export const getSingleUser = createAsyncThunk(
    "auth/getSingleUser",async(_,thunkApi)=>{
        try{
           return await authService.getSingleUser();
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
);
//updateUser:
export const updateUser = createAsyncThunk(
    "auth/updateUser",async(userData,thunkApi)=>{
        try{
           return await authService.updateUser(userData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
);
//getLoginStatus:
export const getLoginStatus = createAsyncThunk(
    "auth/getLoginStatus",async(_,thunkApi)=>{
        try{
            await authService.getLoginStatus()
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
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
    "auth/updateUserPhoto",async(userData,thunkApi)=>{
        try{
           return await authService.updateUserPhoto(userData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{
        RESET_AUTH(state){
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=false;
            state.message=" ";
        },
    },
    extraReducers:(builder)=>{
        builder
        //1:register:=========================================================
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isLoggedIn = true;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = action.payload;
            console.log(action.payload)
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading= false;
            //state.isSuccess=action.payload;
            state.user=null;
            state.message=action.payload
            console.log(action.payload)
        })
        //2:login:==============================================================
        .addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isLoggedIn=true;
            state.isSuccess=true;
            state.message= action.payload;
            //state.user = action.payload
            state.user = action.payload.user;
            state.isError = false;
            console.log(action.payload)
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            state.user=null;
            console.log(action.payload)
        }) 
        //3:logout:========================================================= 
        .addCase(logout.pending,(state)=>{
            state.isLoading = false;  
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isLoggedIn = true;
            state.isError = false;
            state.user = null;
            state.message=action.payload;
            state.isSuccess=true;
            console.log(action.payload)
        })
        .addCase(logout.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
            console.log(action.payload)
        })
        //4:getSingleUser:===================================================
        .addCase(getSingleUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getSingleUser.fulfilled,(state,action)=>{
            
            state.isSuccess = true;
            state.user = action.payload
            state.isLoading=false;
            state.isLoggedIn=action.payload;
            state.message=action.payload
            //console.log(action.payload)
        })
        .addCase(getSingleUser.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading = false;
            state.isSuccess=false;
            state.message=action.payload;
            state.user=null
            console.log(action.payload)
        })
        //5:updateUser:======================================================
        .addCase(updateUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoggedIn=true;
            state.isSuccess= true;
            state.message =action.payload;
            console.log(action.payload)
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
        })
        //6:getLoginStatus:
        .addCase(getLoginStatus.pending,(state)=>{
            state.isLoading=true;            
        })
        .addCase(getLoginStatus.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isLoggedIn=true;
            state.message=action.payload;
        })
        .addCase(getLoginStatus.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload;
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
        //updateUserPhoto:
        .addCase(updateUserPhoto.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(updateUserPhoto.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.message=action.payload;
            console.log(action.payload)
        })
        .addCase(updateUserPhoto.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            console.log(action.payload)
        })
    }
});

const  store = configureStore({
    reducer:{auth:authSlice.reducer}
});

export const authActions = authSlice.actions;
export default store  