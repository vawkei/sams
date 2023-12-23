import Layout from "./components/layout/Layout";
import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./components/profile/Profile";
import axios from "axios";
import { getLoginStatus, getSingleUser } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AdminOnlyRoute } from "./components/adminFolders/adminOnly/AdminOnlyRoute";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./components/shop/product-detail/ProductDetail";


function App() {
  axios.defaults.withCredentials = true;

  const { user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (user === null) {
      dispatch(getSingleUser());
    }
  }, [dispatch, user]);

  return (
    <Layout>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={
            <AdminOnlyRoute>
                <AdminPage />
            </AdminOnlyRoute>
          } />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
    </Layout>
  );
}

export default App;
