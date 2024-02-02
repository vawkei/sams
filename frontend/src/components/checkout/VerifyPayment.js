import classes from "./VerifyPayment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { verifypayment } from "../../store/paystack/paystackIndex";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../store/order/orderIndex";
import { cartSliceActions } from "../../store/cart/cartIndex";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { incomingOrder } = useSelector((state) => state.order);

  const query = useQuery();

  const verifyPayment = async () => {
    try {
      const reference = query.get("reference");
      if (reference) {
        await dispatch(verifypayment({ reference }));
        await dispatch(createOrder(incomingOrder));
        localStorage.setItem("cartItems", JSON.stringify([]));
        dispatch(cartSliceActions.RESET_CART());
        navigate("/checkout");
      } else {
        throw new Error("No transaction reference found");
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  let timer;
  useEffect(() => {
    timer = setTimeout(() => {
      verifyPayment();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes["account-confirmation"]}>
      <h2>Payment Verified</h2>
    </div>
  );
};

export default VerifyPayment;
