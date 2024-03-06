import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/orders/`;

//createOrder:
const createOrder = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//updateOrderWebhook:
const updateOrderWebhook = async (webhookResponse) => {
  const response = await axios.patch(
    API_URL + "updateOrderWebhook",
    webhookResponse
  );
  return response.data;
};

//getAdminOrders:
const getAdminOrders = async () => {
  const response = await axios.get(API_URL + "getAdminOrders");
  return response.data;
};
//getOrders:
const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//getSingleOrder:
const getSingleOrder = async (id) => {
  const response = await axios.get(API_URL + id, id);
  return response.data;
};

//updateOrderStatus:
const updateOrderStatus = async (id, formData) => {
  const response = await axios.patch(
    API_URL + "updateOrderStatus/" + id,
    formData
  );
  return response.data;
};

const orderService = {
  createOrder,
  updateOrderWebhook,
  getAdminOrders,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
};

export default orderService;

//creating an order and using stringify method
// const createOrder = async (formData) => {
//   // Convert formData to a JSON string if it's not already
//   const data = JSON.stringify(formData);

//   // Set the headers for the request
//   const headers = {
//      'Content-Type': 'application/json',
//   };

//   // Make the POST request with the specified headers
//   const response = await axios.post(API_URL, data, { headers });

//   return response.data;
//  };
