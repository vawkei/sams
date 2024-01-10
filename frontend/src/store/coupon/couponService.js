import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/coupons/`;

//createCoupon:
const createCoupon = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//getCoupons:
const getCoupons = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//getSingleCoupon:
const getSingleCoupon = async (couponName) => {
  const response = await axios.get(API_URL + couponName, couponName);
  return response.data;
};

//deleteCoupon:
const deleteCoupon = async (couponName) => {
  const response = await axios.delete(API_URL + couponName, couponName);
  return response.data;
};

// //saveCartDb:
// const saveCouponDb = async (couponData) => {
//   const response = await axios.patch(API_URL + "saveCartDb", couponData);
//   return response.data;
// };

// //getCartDb:
// const getCouponDb = async () => {
//   const response = await axios.get(API_URL + "getCartDb");
//   return response.data;
// };

const couponService = {
  createCoupon,
  getCoupons,
  getSingleCoupon,
  deleteCoupon,
  // saveCouponDb,
  // getCouponDb,
};
export default couponService;
