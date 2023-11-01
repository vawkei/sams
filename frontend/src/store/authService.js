import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/` 

const register =async (userData) =>{
    const response  =await axios.post(API_URL + "register",userData,{
        withCredentials:true
    });
    return response.data 
};
const login =async (userData) =>{
    const response =await axios.post(API_URL + "login",userData);
    return response.data
};
const logout =async () =>{
    const response =await axios.get(API_URL + "logout");
    return response.data
};
const getSingleUser =async () =>{
    const response =await axios.get(API_URL + "getSingleUser");
    return response.data
};
const updateUser =async (userData)=>{
    const response =await axios.patch(API_URL + "updateUser",userData);
    return response.data
} ;
const getLoginStatus =async () =>{
    const response =await axios.get(API_URL + "loginstatus/getstatus")
    return response.data
};
// const uploadUserPhoto = async (userData) =>{
//     const response = await axios.post(API_URL + "uploadUserPhoto")
//     return response.data
// };
const updateUserPhoto = async(userData) =>{
    const response = await axios.patch(API_URL + "updateUserPhoto",userData)
    return response.data
};

const authService = {register,login,logout,getSingleUser,updateUser,getLoginStatus,updateUserPhoto};

export default authService;