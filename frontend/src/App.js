import Layout from "./components/layout/Layout";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./components/shop/product-detail/ProductDetail";
import ProductReview from "./components/shop/product-detail/ProductReview";
import CartPage from "./pages/CartPage";
import PayWithPaystack from "./pages/PayWithPaystackPage";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetails from "./components/order-history/OrderDetails";
import OrderReview from "./components/order-history/OrderReview";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfileHome from "./components/profile/ProfileHome";
import ProfileForm from "./components/profile/ProfileForm";
import { AnimatePresence } from "framer-motion";
import VerifyPayment from "./components/checkout/VerifyPayment";
import PaymentMethod from "./components/cart/PaymentMethod";
import UseEffect from "./components/checkout/UseEffect";
import PayOnDeliveryPage from "./pages/PayOnDeliveryPage";
import PayOnDeliveryCheckout from "./components/checkout/PayOnDeliveryCheckout";
import ContactPage from "./pages/ContactPage";
//import PayWithPaystack from "./components/checkout/PayWithPaystack";


const NavigateToPreferredDomain = ()=>{
  const preferredDomain = process.env.REACT_APP_FRONTEND_URL;
  const currentDomain = window.location.hostname;

  if(currentDomain !==preferredDomain){
    return <Navigate to={`${preferredDomain}${window.location.pathname}`}/>
  }
  return null
};

function App() {
  axios.defaults.withCredentials = true;

  const { user, isLoggedIn } = useSelector((state) => state.auth);

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
      <AnimatePresence mode="wait">
        <ToastContainer />
        <Routes location={location} key={location.key}>
          <Route element={<NavigateToPreferredDomain />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfileHome />} />
          <Route path="/profile/edit-profile" element={<ProfileForm />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <AdminPage />
              </AdminOnlyRoute>
            }
          />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/product-review" element={<ProductReview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route
            path="/pay-with-paystack"
            element={<PayWithPaystack />}
          />
          <Route
            path="/pay-on-delivery"
            element={<PayOnDeliveryPage />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout-ondelivery" element={<PayOnDeliveryCheckout/>}/>
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/order-history/:id" element={<OrderDetails />} />
          <Route path="/order-review/:id" element={<OrderReview />} />
          <Route path="/verify-payment" element={<VerifyPayment />} />
          <Route path="/use-effect" element={<UseEffect />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
