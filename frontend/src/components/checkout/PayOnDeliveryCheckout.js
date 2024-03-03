import Button from "../ui/button/Button";
import classes from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";

const PayOnDeliveryCheckout = () => {

    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate("/order-history");
      };

    return ( 
        <div className={classes["checkout-container"]}>
          <h2>Checkout Successful</h2>
          <p>Thank you for your purchase</p>
          <p>You will get your items shortly</p>
          <Button onClick={navigateHandler} className={classes.btn}>Go to Order History</Button>
        </div>
    
     );
}
 
export default PayOnDeliveryCheckout;