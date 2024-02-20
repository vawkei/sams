import classes from "./Refund.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refundOrder } from "../../../store/paystack/paystackIndex";
import { useState } from "react";
import { toast } from "react-toastify";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import Loader from "../../ui/loader/Loader"

const Refund = () => {
  const [paystackTransactionId, setPaystackTransactionId] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=>state.paystack)

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    if (!paystackTransactionId || !amount) {
      console.log("Please fill the inputs!!!");
      toast.error("Please fill the inputs!!!");
      return;
    };

    const formData = { paystackTransactionId, amount };

    await dispatch(refundOrder(formData));
  };

  return (
    <Card className={classes.cardClass}>
      {isLoading && <Loader />}
      <h2>paystack TransactionId</h2>
      <form onSubmit={onSubmitHandler} className={classes.container}>
        <div className={classes.control}>
          <label htmlFor="">Transaction id:</label>
          <input
            type="text"
            value={paystackTransactionId}
            onChange={(e) => setPaystackTransactionId(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <Button className={classes.btn}>Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default Refund;
