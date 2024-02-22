import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/`;

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

const verifyEmail = async (verificationToken, email) => {
  const response = await axios.post(API_URL + "verifyEmail", {
    verificationToken,
    email,
  });
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data;
};

const forgotPassword = async(formData)=>{
  const response = await axios.post(API_URL + "forgotPassword", formData)
  return response.data;
};

const resetPassword = async(formData)=>{
  const response = await axios.post(API_URL + "resetPassword", formData)
  return response.data;
};

const getSingleUser = async () => {
  const response = await axios.get(API_URL + "getSingleUser");
  return response.data;
};

const getAllUsers = async ()=>{
  const response = await axios.get(API_URL + "getAllUsers");
  return response.data
};

const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginstatus/getstatus");
  return response.data;
};
// const uploadUserPhoto = async (userData) =>{
//     const response = await axios.post(API_URL + "uploadUserPhoto")
//     return response.data
// };
const updateUserPhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updateUserPhoto", userData);
  return response.data;
};

// sendContactMail:
const sendContactMail = async (formData) => {
  const response = await axios.post(API_URL + "sendContactMail", formData);
  return response.data
};

//clearCart;
const clearCart = async () =>{
  const response = await axios.patch(API_URL + "clearCart")
  return response.data;
};

const authService = {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getSingleUser,
  updateUser,
  getLoginStatus,
  updateUserPhoto,
  sendContactMail,
  clearCart
};

export default authService;
