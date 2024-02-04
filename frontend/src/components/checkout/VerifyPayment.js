import classes from "./VerifyPayment.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { cartSliceActions } from "../../store/cart/cartIndex";
import { verifypayment } from "../../store/paystack/paystackIndex";
import { createOrder } from "../../store/order/orderIndex";
import Button from "../ui/button/Button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { incomingOrder } = useSelector((state) => state.order);
  console.log(incomingOrder);

  const formDataString = localStorage.getItem("formData");
  const formDataObject = JSON.parse(formDataString);
 console.log(formDataObject);  

  const query = useQuery();

  const navigateHandler = () => {
    navigate("/checkout");
  };

  const submitHandler = async () => {
    const reference = query.get("reference");

    try {
      if (reference) {
        await dispatch(verifypayment({ reference }));
        await dispatch(createOrder({formDataObject}))
        console.log(incomingOrder);

        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("formData",JSON.stringify([]));
        dispatch(cartSliceActions.RESET_CART());
        // navigate("/checkout");
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
  }, [query]);

  return (
    <div className={classes["account-confirmation"]}>
      <h2>Payment Verified</h2>
      <Button onClick={navigateHandler}>Proceed to checkout</Button>
    </div>
  );
};

export default VerifyPayment;

//  const verifyPayment = async () => {
//   try {
//     const reference = query.get("reference");
//     if (reference) {
//       await dispatch(verifypayment({ reference }));
//     } else {
//       throw new Error("No transaction reference found");
//     }
//   } catch (error) {
//     console.log("Something went wrong:", error);
//     // Consider adding more robust error handling here
//   }
// };

// // Call verifyPayment after a delay
// useEffect(() => {
//   const timer = setTimeout(() => {
//     verifyPayment();
//   }, 3000);

//   return () => clearTimeout(timer);
// }, []); // Empty dependency array to run only on mount

// useEffect(() => {
//  if (incomingOrder) {
//    const submitOrderAsync = async () => {
//      try {
//        await dispatch(createOrder({ incomingOrder }));
//        localStorage.setItem("cartItems", JSON.stringify([]));
//        dispatch(cartSliceActions.RESET_CART());
//        navigate("/checkout");
//      } catch (error) {
//        console.error('Failed to submit order:', error);
//        // Additional error handling logic
//      }
//    };

//    submitOrderAsync();
//  }
// }, [incomingOrder]);
