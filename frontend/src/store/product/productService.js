import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/products/`;

//createProduct:

const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//getProducts:
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//getSingleProduct:
const getSingleProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

//updateProduct:
const updateProduct = async (id, formData) => {
  const response = await axios.patch(API_URL + id, formData);
  return response.data;
};

//deleteProduct:
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

//review:
const review = async (id, formData) => {
  const response = await axios.patch(API_URL + "review" + id, formData);
  return response.data;
};

//deleteProductReview:
const deleteReview = async(id)=>{
    const response = await axios.patch(API_URL + "deleteReview" + id);
    return response.data
};

//updateReview:
const updateReview = async(id,formData)=>{
  const response = await axios.patch(API_URL + "updateReview" + id , formData)
  return response.data
}

const productService = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  review,
  deleteReview,
  updateReview
};
export default productService;
