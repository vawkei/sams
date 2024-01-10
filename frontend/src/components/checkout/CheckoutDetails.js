import { useState, useRef, Fragment, useEffect } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import classes from "./CheckoutDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { cartActions } from "../../../store";
import { cartSliceActions } from "../../store/cart/cartIndex";
import { useNavigate } from "react-router-dom";
import { createOrder, orderSliceActions } from "../../store/order/orderIndex";
import {
  acceptpayment,
  paystackSliceAction,
  verifypayment,
} from "../../store/paystack/paystackIndex";

const CheckoutDetails = () => {
  const [formValidity, setFormValidity] = useState({
    firstName: true,
    surname: true,
    residentialAddress: true,
    town: true,
    state: true,
    phoneNumber: true,
  });

  const firstNameInputRef = useRef();
  const surnameInputRef = useRef();
  const residentialAddressInputRef = useRef();
  const townInputRef = useRef();
  const stateInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
 

  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmount);
  // console.log(cartTotalAmnt)
  const { user } = useSelector((state) => state.auth);
  //console.log(user);

  const {message} = useSelector((state)=>state.paystack);
  const { coupon } = useSelector((state) => state.coupon);
  var nairaSymbol = "\u20A6";



  let formData;

  const confirmHandler = async (e) => {
    e.preventDefault();

    //input data retrieval:
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredResidentialAddress = residentialAddressInputRef.current.value;
    const enteredTown = townInputRef.current.value;
    const enteredState = stateInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;

    //validation:
    const enteredFirstNameIsValid = enteredFirstName.trim() !== "";
    const enteredSurnameIsValid = enteredSurname.trim() !== "";
    const enteredResidentialAddressIsValid =
      enteredResidentialAddress.trim() !== "";
    const enteredTownIsValid = enteredTown.trim() !== "";
    const enteredStateIsValid = enteredState.trim() !== "";
    const enteredPhoneNumberIsValid = enteredPhoneNumber.trim().length === 11;

    // updating the formValidity state:
    // Note that all the properties here will be set to true if the user input tallies with the validation.And formValidity has been set to true initially, so its gonna be true meets true, else if any of the user input isnt valid, like phone number isnt 11 digits, then it will be false, which will render it invalid
    setFormValidity({
      firstName: enteredFirstNameIsValid,
      surname: enteredSurnameIsValid,
      residentialAddress: enteredResidentialAddressIsValid,
      town: enteredTownIsValid,
      state: enteredStateIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
    });

    //ensuring the form is valid and properly filled:
    let formIsValid =
      enteredFirstNameIsValid &&
      enteredSurnameIsValid &&
      enteredResidentialAddressIsValid &&
      enteredTownIsValid &&
      enteredStateIsValid &&
      enteredPhoneNumberIsValid;

    if (!formIsValid) {
      console.log("Fill in the inputs baby!!!");
      return;
    }

    console.log("God Please Bless my Handwork");

   formData = {
      firstName: enteredFirstName,
      surname: enteredSurname,
      residentialAddress: enteredResidentialAddress,
      town: enteredTown,
      state: enteredState,
      phoneNumber: enteredPhoneNumber,
      cartItems: cartItems,
      orderAmount: cartTotalAmnt,
      cartTotalQty:cartTotalQty,
      orderDate: new Date().toDateString(),
      orderTime: new Date().toLocaleTimeString(),
      coupon: coupon ? coupon : null,
      orderStatus: "Order Placed",
      email: user.email,
    };
    dispatch(paystackSliceAction.SAVE_ORDER_DATA(formData))
    const paymentData = { amount: cartTotalAmnt, email: user.email };
    dispatch(orderSliceActions.SAVE_ORDER_DATA(formData));
    const transactionReference = await dispatch(acceptpayment(paymentData));
    console.log(transactionReference);
    
    handleVerify();
    if(message === "Honor Blackman is Pussy Galore"){
      dispatch(createOrder(formData))
      dispatch(cartSliceActions.RESET_CART());
      console.log("order placed...");
      navigate("/checkout")
    }
    //====================================stops here=============
    // dispatch(createOrder(formData))

    // props.onPayStackSubmitHandler(formData);
    // dispatch(cartSliceActions.CLEAR_CART());
  };

  const handleVerify = async (reference) => {
    try {
      await dispatch(verifypayment(reference));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   if(message === "Honor Blackman is Pussy Galore"){
  //     dispatch(createOrder(formData))
  //     dispatch(cartSliceActions.RESET_CART());
  //     console.log("order placed...")
  //   }
  // },[dispatch,message,formData]);


  // useEffect(() => {
  //   if (message === "Honor Blackman is Pussy Galore") {
  //     dispatch(createOrder(formData)).then(() => {
  //       dispatch(cartSliceActions.RESET_CART());
  //       console.log("order placed...");
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }
  //  }, [dispatch, message, formData]);
   

  const onCancel = () => {
    stateInputRef.current.value = "";
    firstNameInputRef.current.value = "";
    surnameInputRef.current.value = "";
    residentialAddressInputRef.current.value = "";
    townInputRef.current.value = "";
    phoneNumberInputRef.current.value = "";
  };

  return (
    <div className={classes.container}>
      {cartItems.length === 0 ? (
        <p>Cart is Freaking Empty</p>
      ) : (
        <Fragment>
          <div className={classes["checkout-details"]}>
            <h2>Checkout Details</h2>
            <Card>
              <form action="" onSubmit={confirmHandler}>
                <div
                  className={`${classes.control} ${
                    !formValidity.firstName ? classes.invalid : ""
                  }`}>
                  <label>First Name:</label>
                  <input type="text" ref={firstNameInputRef} />
                  {!formValidity.firstName && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.surname ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">Surname:</label>
                  <input type="text" ref={surnameInputRef} />
                  {!formValidity.surname && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.residentialAddress ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">Residential Address:</label>
                  <input type="text" ref={residentialAddressInputRef} />
                  {!formValidity.residentialAddress && (
                    <p>Please fill out the input</p>
                  )}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.town ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">Town:</label>
                  <input type="text" ref={townInputRef} />
                  {!formValidity.town && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.state ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">State:</label>
                  <input type="text" ref={stateInputRef} />
                  {!formValidity.state && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.phoneNumber ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">Phone Number:</label>
                  <input type="text" ref={phoneNumberInputRef} />
                  {!formValidity.phoneNumber && (
                    <p>Phone number should be 11 digits</p>
                  )}
                </div>
                <div className={classes.action}>
                  <Button onClick={onCancel} className={classes.btn}>
                    Cancel
                  </Button>
                  <Button className={classes.btn} onClick={confirmHandler}>
                    Proceed
                  </Button>
                </div>
                {!formValidity.firstName &&
                  !formValidity.phoneNumber &&
                  !formValidity.residentialAddress &&
                  !formValidity.surname &&
                  !formValidity.state &&
                  !formValidity.town && <p>Please fill out the inputs</p>}
              </form>
            </Card>
          </div>

          <div className={classes["checkout-summary"]}>
            <div className={classes.lead}>
              <h2>Checkout Summary</h2>
              <p style={{ color: "red" }}>
                <b> {`Cart Items: ${cartTotalQty}`} </b>
              </p>
              <p style={{ color: "green" }}>
                <b>
                  {" "}
                  {`Total Amount: ${nairaSymbol}${cartTotalAmnt.toLocaleString()}`}{" "}
                </b>
              </p>
            </div>

            <Card className={classes.itemCard}>
              {cartItems.map((item, index) => {
                return (
                  <div key={item._id} className={classes.item}>
                    <h4>
                      <b> {item.name} </b>
                    </h4>
                    <p>
                      <b> {`Quantity:${item.productCartQty}`} </b>
                    </p>
                    <p>
                      <b>
                        {`Unit Price: ${nairaSymbol}${item.price.toLocaleString()}`}
                      </b>
                    </p>
                    <p>
                      <b>
                        {`Set Price: ${nairaSymbol}${(
                          item.price * item.productCartQty
                        ).toLocaleString()}`}
                      </b>
                    </p>
                  </div>
                );
              })}
            </Card>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CheckoutDetails;
