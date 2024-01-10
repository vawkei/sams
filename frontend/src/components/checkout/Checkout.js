import classes from "./Checkout.module.css";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  
  const navigateHandler = () => {
    navigate("/order-history");
  };
  

  return (
    <div className={classes["checkout-container"]}>
      <h2>Checkout Successful</h2>
      <p>Thank you for your purchase</p>
      <div className={classes.action}>
        <Button className={classes.btn} onClick={navigateHandler}>
          View Order Status
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
