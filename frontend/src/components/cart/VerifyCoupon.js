import classes from "./VerifyCoupon.module.css";
import Button from "../ui/button/Button";
import { useEffect, useState } from "react";
import Card from "../ui/card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  couponSliceActions,
  getSingleCoupon,
} from "../../store/coupon/couponIndex";
import Spinner from "../ui/spinner/Spinner";

const VerifyCoupon = () => {
  const [showForm, setShowForm] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [showHaveACouponQuestion, setShowHaveACouponQuestion] = useState(true);

  const couponItem = useSelector((state) => state.coupon.coupon);
  const isError = useSelector((state) => state.coupon.isError);
  const message = useSelector((state) => state.coupon.message);
  const isLoading = useSelector((state) => state.coupon.isLoading);
  console.log(couponItem);
  console.log(isError, message);

  const { initialCartTotalAmount } = useSelector((state) => state.cart);
  console.log(initialCartTotalAmount);

  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowForm(true);
    //setShowHaveACouponQuestion(false)
  };

  const removeCouponHandler = () => {
    dispatch(couponSliceActions.REMOVE_COUPON());
    setShowForm(false);
    setShowHaveACouponQuestion(true);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getSingleCoupon(couponName));
    setCouponName("");
    setShowForm(false);
    // setShowHaveACouponQuestion(false);
  };

  useEffect(() => {
    if (couponItem) {
      setShowHaveACouponQuestion(false);
    }
  }, [couponItem]);

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
        <>
          {/* {isLoading && (
            <div className={classes.spinner}>
              <Spinner />
            </div>
          )} */}
          {showHaveACouponQuestion && (
            <div className={classes["have-A-coupon"]}>
              <h4>Have a coupon ?</h4>
              <p
                onClick={showFormHandler}
                style={{ color: "blue", cursor: "pointer" }}>
                Add a coupon
              </p>
            </div>
          )}
        </>
      )}
      {couponItem && (
        <div className={classes["coupon-discount-container"]}>
          <div className={classes["coupon-discount"]}>
            <p>
              <b>Coupon:</b> {couponItem?.name} ||
            </p>
            <p>
              <b>Payment Before Discount:</b>
              {initialCartTotalAmount} ||
            </p>
            <p>
              <b>Discount:</b> {couponItem?.discount} % slashed
            </p>
          </div>

          <p
            onClick={removeCouponHandler}
            style={{ color: "red", cursor: "pointer" }}
            className={classes["remove-coupon"]}>
            Remove coupon
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyCoupon;
