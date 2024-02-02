import classes from "./VerifyPayment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { verifypayment } from "../../store/paystack/paystackIndex";
import { useEffect } from "react";
import Button from "../ui/button/Button";
import { Link, useLocation } from "react-router-dom";
import { createOrder } from "../../store/order/orderIndex";
import { cartSliceActions } from "../../store/cart/cartIndex";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPayment = async () => {
  const dispatch = useDispatch();
  const { incomingOrder } = useSelector((state) => state.order);

  const query = useQuery();

  useEffect(() => {
    const reference = query.get("reference");
    dispatch(verifypayment({ reference: reference }));
    dispatch(createOrder(incomingOrder));
    console.log("order placed...");
    localStorage.setItem("cartItems", JSON.stringify([]));
    dispatch(cartSliceActions.RESET_CART());
  }, [dispatch]);

  return (
    <div className={classes["account-confirmation"]}>
      <h2>Payment Verified</h2>
      <Link to={"/checkout"}>
        <Button className={classes.btn}></Button>
      </Link>
    </div>
  );
};

export default VerifyPayment;
