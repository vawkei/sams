import classes from "./VerifyCoupon.module.css";
import Button from "../ui/button/Button";
import { useState } from "react";
import Card from "../ui/card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  couponSliceActions,
  getSingleCoupon,
} from "../../store/coupon/couponIndex";


const VerifyCoupon = () => {
  const [showForm, setShowForm] = useState(false);
  const [couponName, setCouponName] = useState("");

  const couponItem = useSelector((state) => state.coupon.coupon);
  console.log(couponItem);

  const {initialCartTotalAmount} = useSelector((state) => state.cart);
  console.log(initialCartTotalAmount)

  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowForm(true);
  };

  const removeCouponHandler = () => {
    dispatch(couponSliceActions.REMOVE_COUPON());
    setShowForm(false)
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getSingleCoupon(couponName));
    setCouponName("")
  };

  return (
    <div>
      {showForm ? (
        <Card>
          <form action="" onSubmit={onSubmitHandler}>
            <div className={classes.control}>
              <input
                type="text"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value.toUpperCase())}
              />
              <div className={classes.action}>
                <Button>Verify</Button>
              </div>
            </div>
          </form>
        </Card>
      ) : (
        <div className={classes["have-A-coupon"]}>
          <h4>Have a coupon ?</h4>
          <p
            onClick={showFormHandler}
            style={{ color: "blue", cursor: "pointer" }}>
            Add a coupon
          </p>
        </div>
      )}
      {couponItem && (
        <div className={classes["coupon-discount-container"]}>
          <div className={classes["coupon-discount"]}>
            <p>Coupon: {couponItem?.name}</p> ||
            <p>Initial Amount:{initialCartTotalAmount}</p> ||
            <p>Discount: {couponItem?.discount} % off</p>
          </div>
          
            <p onClick={removeCouponHandler} style={{ color: "red", cursor: "pointer" }} className={classes["remove-coupon"]}>Remove coupon</p>
        
        </div>
      )}
    </div>
  );
};

export default VerifyCoupon;

