
// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import couponService from "./couponService";

// const initialCouponState = {
//     coupon: null,
//     coupons:[],
//     message:"",
//     isSuccess:false,
//     isError:false,
//     isLoading:false,
//     isLoggedIn:false
// };

// //createCoupon:
// export const createCoupon = createAsyncThunk(
//     "coupons/",async(formData,thunkApi)=>{
//         try{
//             return await couponService.createCoupon(formData)
//         }catch(error){
//             const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// );

// //getCoupons:
// export const getCoupons = createAsyncThunk(
//     "coupons/getCoupons",async(_,thunkAPI)=>{
//         try{
//             return await couponService.getCoupons()
//         }catch(error){
//             const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// );

// //getSingleCoupon:
// export const getSingleCoupon = createAsyncThunk(
//     "coupons/getSingleCoupon",async(couponName,thunkAPI)=>{
//         try{
//             return await couponService.getSingleCoupon(couponName)
//         }catch(error){
//             const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// );

// //deleteCoupons:
// export const deleteCoupon = createAsyncThunk(
//     "coupons/:couponName",async(couponName,thunkAPI)=>{
//         try{
//             return await couponService.deleteCoupon(couponName)
//         }catch(error){
//             const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )



// const couponSlice = createSlice({
//     name:"coupon",
//     initialState:initialCouponState,
//     reducers:{
//         REMOVE_COUPON(state){
//             state.coupon = null
//             console.log("coupon removed")
//         }
//     },
//     extraReducers(builder){
//         builder
//         //createCoupon:
//         .addCase(createCoupon.pending,(state)=>{
//             state.isLoading = true
//         })
//         .addCase(createCoupon.fulfilled,(state,action)=>{
//             state.isLoading = false;
//             state.message = action.payload.msg;
//             console.log(action.payload)
//         })
//         .addCase(createCoupon.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.isError=true;
//             state.message = action.payload.msg
//             console.log(action.payload)
//         })
//         //getCoupons:
//         .addCase(getCoupons.pending,(state)=>{
//             state.isLoading = true
//         })
//         .addCase(getCoupons.fulfilled,(state,action)=>{
//             state.isLoading =false;
//             state.coupons = action.payload.coupons;
//             console.log(action.payload);
//         })
//         .addCase(getCoupons.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.isError = true;
//             state.message=action.payload.msg
//             console.log(action.payload)
//         })
//         //getSingleCoupon:
//         .addCase(getSingleCoupon.pending,(state)=>{
//             state.isLoading = true;
//         })
//         .addCase(getSingleCoupon.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             state.coupon=action.payload.coupon;
//             console.log(action.payload)
//         })
//         .addCase(getSingleCoupon.rejected,(state,action)=>{
//             state.isLoading= false;
//             state.coupon=null;
//             state.isError=true;
//             console.log(action.payload)
//         })
//         //deleteCoupon:
//         .addCase(deleteCoupon.pending,(state)=>{
//             state.isLoading = true;
//         })
//         .addCase(deleteCoupon.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             state.isSuccess = true;
//             //toast.success(action.payload)
//             console.log(action.payload)
//         })
//         .addCase(deleteCoupon.rejected,(state,action)=>{
//             state.isLoading=false;
//             state.isError=true;
//             state.isSuccess=false;
//             //toast.error(action.payload);
//             console.log(action.payload)
//         })
//     }
// })

// export default couponSlice;
// export const couponSliceActions = couponSlice.actions
















import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";
import {toast} from "react-toastify"

const initialCouponState = {
    // coupon: null,
    coupon: localStorage.getItem("coupon")
  ? JSON.parse(localStorage.getItem("coupon"))
  : null,
    coupons:[],
    message:"",
    isSuccess:false,
    isError:false,
    isLoading:false,
    isLoggedIn:false
};

//createCoupon:
export const createCoupon = createAsyncThunk(
    "coupons/",async(formData,thunkApi)=>{
        try{
            return await couponService.createCoupon(formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
);

//getCoupons:
export const getCoupons = createAsyncThunk(
    "coupons/getCoupons",async(_,thunkAPI)=>{
        try{
            return await couponService.getCoupons()
        }catch(error){
            const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//getSingleCoupon:
export const getSingleCoupon = createAsyncThunk(
    "coupons/getSingleCoupon",async(couponName,thunkAPI)=>{
        try{
            return await couponService.getSingleCoupon(couponName)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);

//deleteCoupons:
export const deleteCoupon = createAsyncThunk(
    "coupons/:couponName",async(couponName,thunkAPI)=>{
        try{
            return await couponService.deleteCoupon(couponName)
        }catch(error){
            const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)



const couponSlice = createSlice({
    name:"coupon",
    initialState:initialCouponState,
    reducers:{
        REMOVE_COUPON(state){
            state.coupon = null
            localStorage.setItem("coupon", JSON.stringify(null));
            console.log("coupon removed from redux and local storage")
        }
    },
    extraReducers(builder){
        builder
        //createCoupon:
        .addCase(createCoupon.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCoupon.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.message = action.payload.msg;
            console.log(action.payload)
            toast.success(action.payload.msg,{position:"top-center"})
            
        })
        .addCase(createCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message = action.payload.msg
            console.log(action.payload)
            toast.error(action.payload.msg,{position:"top-center"})
        })
        //getCoupons:
        .addCase(getCoupons.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCoupons.fulfilled,(state,action)=>{
            state.isLoading =false;
            state.coupons = action.payload.coupons;
            console.log(action.payload);
        })
        .addCase(getCoupons.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError = true;
            state.message=action.payload.msg
            console.log(action.payload)
        })
        //getSingleCoupon:
        .addCase(getSingleCoupon.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSingleCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.coupon=action.payload.coupon;
            //save to local storage:
            localStorage.setItem("coupon", JSON.stringify(state.coupon));
            // console.log(action.payload)
            // console.log(action.payload.coupon)
        })
        .addCase(getSingleCoupon.rejected,(state,action)=>{
            state.isLoading= false;
            state.coupon=null;
            state.isError=true;
            console.log(action.payload)
        })
        //deleteCoupon:
        .addCase(deleteCoupon.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess = true;
            console.log(action.payload)
            toast.success(action.payload.msg,{position:"top-center"})
        })
        .addCase(deleteCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            console.log(action.payload)
            toast.error(action.payload,{position:"top-center"});
        })
    }
})

export default couponSlice;
export const couponSliceActions = couponSlice.actions