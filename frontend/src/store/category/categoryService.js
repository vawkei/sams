import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/categories/`;

//createCategory:
const createCategory = async (formData) => {
  const response = await axios.post(API_URL,formData);
  return response.data;
};

//getCategories:
const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//getSingleCategory:
const getSingleCategory = async (id) => {
  const response = await axios.get(API_URL, id);
  return response.data;
};

//deleteCategory:
const deleteCategory = async (slug) => {
  const response = await axios.delete(API_URL + slug);
  return response.data
};

const categoryService = {
  createCategory,
  getCategories,
  getSingleCategory,
  deleteCategory,
};

export default categoryService;
