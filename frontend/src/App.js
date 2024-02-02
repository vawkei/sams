import Layout from "./components/layout/Layout";
import {Routes,Route, useLocation} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import LoginPage from "./pages/LoginPage";
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
import CartPage from "./pages/CartPage";
import CheckoutDetailsPage from "./pages/CheckoutDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetails from "./components/order-history/OrderDetails";
import OrderReview from "./components/order-history/OrderReview";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfileHome from "./components/profile/ProfileHome";
import ProfileForm from "./components/profile/ProfileForm";
import {AnimatePresence} from "framer-motion"
import VerifyPayment from "./components/checkout/VerifyPayment";

function App() {
  axios.defaults.withCredentials = true;

  const { user,isLoggedIn} = useSelector((state) => state.auth);


  const location = useLocation();

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
      <AnimatePresence >
      <ToastContainer />
        <Routes location={location} key={location.key}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfileHome />} />
          <Route path="/profile/edit-profile" element={<ProfileForm />} />
          <Route path="/admin/*" element={
            <AdminOnlyRoute>
                <AdminPage />
            </AdminOnlyRoute>
          } />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-details" element={<CheckoutDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/order-history/:id" element={<OrderDetails />} />
          <Route path="/order-review/:id" element={<OrderReview />} />
          <Route path="/verify-payment" element={<VerifyPayment />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
        </AnimatePresence>
    </Layout>
  );
}

export default App;
