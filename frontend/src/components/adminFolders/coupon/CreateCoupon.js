import classes from "./CreateCoupon.module.css";
import Button from "../../ui/button/Button";
import Card from "../../ui/card/Card";
import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCoupon, getCoupons } from "../../../store/coupon/couponIndex";
import {useDispatch,useSelector} from "react-redux";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  const {isLoading} = useSelector((state)=>state.coupon);

  const dispatch =  useDispatch()

  const submitCouponHandler =async (e)=>{
    e.preventDefault();
    
    if(name.length < 5){
        console.log("lisalipps shouldn't be less than 5 charxters");
        return
    };
    if(name.length > 18){
        console.log("lisalipps shouldn't be more than 18 charxters");
        return
    };
    if(discount < 1){
        console.log("lisalipps shouldn't be less than 1");
        return
    };
    // console.log(name,discount,startDate)
    const formData ={name:name,discount:discount,expiryDate:startDate};
    await dispatch(createCoupon(formData))
    await dispatch(getCoupons())
    setName("");
    setDiscount(0);
    setStartDate(new Date()) 
  }

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={classes["create-coupon"]}>
        <h2>
          <b>Create Coupon</b>
        </h2>
        <p>Use this form to Create a Coupon</p>
        <Card>
          <form action="" onSubmit={submitCouponHandler}>
            <div className={classes.control}>
              <label htmlFor="">Coupon name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label>Coupon discount:</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="">Expiry date:</label>
              <DatePicker
                selected={startDate}
                value={startDate} 
                onChange={(date) =>setStartDate(date)}
              />
            </div>
            <div className={classes.action}>
              <Button className={classes.btn}>Create Coupon</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCoupon;
