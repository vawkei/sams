import classes from "./VerifyPayment.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { cartSliceActions } from "../../store/cart/cartIndex";
import { verifypayment } from "../../store/paystack/paystackIndex";
import { createOrder } from "../../store/order/orderIndex";
// import {toast} from "react-toastify"
//import Button from "../ui/button/Button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { incomingOrder } = useSelector((state) => state.form);
  console.log(incomingOrder);

  const query = useQuery();

  // const navigateToOrdersHandler = () => {
  //   navigate("/order-history");
  // };

  const submitHandler = async () => {
    const reference = query.get("reference");

    try {
      if (reference) {
        await dispatch(verifypayment({ reference }));
        await dispatch(createOrder(incomingOrder));

        localStorage.setItem("cartItems", JSON.stringify([]));
        dispatch(cartSliceActions.RESET_CART());
        navigate("/checkout");
      } else {
        console.log("No reference found");
        throw new Error("No reference found");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    submitHandler();
  }, []);

  return (
    <div className={classes["verification"]}>
      <h2>Payment Verified</h2>
      {/* <Button onClick={navigateToOrdersHandler} className={classes.btn}>
        View Orders
      </Button> */}
    </div>
  );
};

export default VerifyPayment;

