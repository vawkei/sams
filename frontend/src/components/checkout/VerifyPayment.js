import classes from "./VerifyPayment.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { cartSliceActions } from "../../store/cart/cartIndex";
import { verifypayment } from "../../store/paystack/paystackIndex";
import { createOrder } from "../../store/order/orderIndex";
import { couponSliceActions } from "../../store/coupon/couponIndex";
// import {toast} from "react-toastify"
//import Button from "../ui/button/Button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const VerifyPayment = () => {
  const [showText, setShowText] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { incomingOrder } = useSelector((state) => state.form);
  console.log(incomingOrder);
  
  const { message,isLoading } = useSelector((state) => state.paystack);
  console.log(message);

  const query = useQuery();

  const submitHandler = async () => {
    const reference = query.get("reference");
    try {
      if (reference) {
        await dispatch(verifypayment({ reference }));
        await dispatch(createOrder(incomingOrder));

        localStorage.setItem("cartItems", JSON.stringify([]));
        dispatch(cartSliceActions.RESET_CART());
        dispatch(couponSliceActions.REMOVE_COUPON());

        const clearer = setTimeout(() => {
          navigate("/checkout");
        }, 8000);
        return () => clearTimeout(clearer);
      } else {
        console.log("No reference found");
        throw new Error("No reference found");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const verifiedSuccessfullyHandler = async () => {
    if (message === "Payment verified successfully") {
      setShowText(true);
    }
  };

  useEffect(() => {
    submitHandler();
  }, []);

  useEffect(() => {
    verifiedSuccessfullyHandler();
  }, [message]);

  return (
    <div className={classes["verification"]}>
      {showText ? (
        <>
          <h2>Payment Verified</h2>
          {/* <Button onClick={navigateToOrdersHandler} className={classes.btn}>
          View Orders
        </Button> */}
        </>
      ) : (
        {isLoading}
      )}
    </div>
  );
};
export default VerifyPayment;
