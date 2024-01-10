import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/`;


//saveCartDb:
const saveCartDb = async(formData)=>{
    const response = await axios.patch(API_URL + "saveCartDb", formData);
    return response.data
};

//getCartDb:
const getCartDb = async()=>{
    const response = await axios.get(API_URL + "getCartDb")
    return response.data
};

const cartService = {saveCartDb,getCartDb};
export default cartService;