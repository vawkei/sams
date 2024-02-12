import Button from "../ui/button/Button";
import classes from "./PaymentMethod.module.css";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();

  const paywithPaystackHandler = () => {
    navigate("/pay-with-paystack");
  };

  const payOnDeliveryHandler = () => {
    navigate("/pay-on-delivery");
  };

  return (
    <div className={classes["payment-method-container"]}>
      <h2>Method of Payment</h2>
      <Button className={classes.btn} onClick={paywithPaystackHandler}>
        Pay with Paystack
      </Button>
      <p>OR</p>
      <Button className={classes.btn} onClick={payOnDeliveryHandler}>
        Pay on Delivery
      </Button>
    </div>
  );
};

export default PaymentMethod;
