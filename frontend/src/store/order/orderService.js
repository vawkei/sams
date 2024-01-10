import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/orders/`;


//createOrder:
const createOrder =async (formData)=>{
    const response = await axios.post(API_URL , formData)
    return response.data
};

//getAdminOrders:
const getAdminOrders = async()=>{
    const response = await axios.get(API_URL + "getAdminOrders");
    return response.data
};
//getOrders:
const getOrders = async()=>{
    const response = await axios.get(API_URL);
    return response.data
};

//getSingleOrder:
const getSingleOrder = async(id)=>{
    const response = await axios.get(API_URL + id, id);
    return response.data
};

//updateOrderStatus:
const updateOrderStatus = async(formData)=>{
    const response = await axios.patch(API_URL + "updateOrderStatus", formData)
    return response.data
};

const orderService = {createOrder,getAdminOrders,getOrders,getSingleOrder,updateOrderStatus};

export default orderService;