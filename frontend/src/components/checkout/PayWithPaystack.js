import { useState, useRef, Fragment, useEffect } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import classes from "./PayWithPaystack.module.css";
import { useDispatch, useSelector } from "react-redux";
import { acceptpayment } from "../../store/paystack/paystackIndex";
import { checkoutDetailsFormActions } from "../../store/order/saveOrderToVerify";
import Spinner from "../ui/spinner/Spinner";


const PayWithPaystack = () => {
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

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartTotalQty = useSelector((state) => state.cart.cartTotalQty);
  const cartTotalAmnt = useSelector((state) => state.cart.cartTotalAmount);
  // console.log(cartTotalAmnt)
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  //console.log(user);

  const { message,isLoading } = useSelector((state) => state.paystack);
  //console.log(message);
  const { coupon } = useSelector((state) => state.coupon);
  const incomingOrder = useSelector((state) => state.form.incomingOrder);
  console.log(incomingOrder);

  var nairaSymbol = "\u20A6";

  // useEffect(() => {
  //   if (user && isLoggedIn) {
  //     firstNameInputRef.current.value = user?.name || "";
  //     surnameInputRef.current.value = user?.surname || "";
  //     phoneNumberInputRef.current.value = "";
  //     residentialAddressInputRef.current.value = user?.address || "";
  //     townInputRef.current.value = user?.town || "";
  //     stateInputRef.current.value = user?.state || "";
  //   }
  // }, [isLoggedIn, user]);

  useEffect(() => {
    if (user && isLoggedIn) {
      if (firstNameInputRef.current) {
        firstNameInputRef.current.value = user?.name || "";
      }
      if (surnameInputRef.current) {
        surnameInputRef.current.value = user?.surname || "";
      }
      if (phoneNumberInputRef.current) {
        phoneNumberInputRef.current.value = user?.phoneNumber || "";
      }
      if (residentialAddressInputRef.current) {
        residentialAddressInputRef.current.value = user?.address || "";
      }
      if (townInputRef.current) {
        townInputRef.current.value = user?.town || "";
      }
      if (stateInputRef.current) {
        stateInputRef.current.value = user?.state || "";
      }
    }
  }, [isLoggedIn, user]);

  let formData;

  const confirmHandlerPaystack = async (e) => {
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
      cartTotalQty: cartTotalQty,
      orderDate: new Date().toDateString(),
      orderTime: new Date().toLocaleTimeString(),
      coupon: coupon ? coupon : null,
      orderStatus: "Order Placed",
      paymentMethod:"Pay with Paystack",
      email: user.email,
    };

    const paymentData = { amount: cartTotalAmnt, email: user.email };

    dispatch(
      checkoutDetailsFormActions.SAVE_CHECKOUT_DETAILS_DATA({ formData })
    );

    try {
      const transactionReference = await dispatch(acceptpayment(paymentData));
      console.log(transactionReference);
      console.log(transactionReference.payload.ref);
    } catch (error) {
      console.log("Error initializing payment:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

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
      {isLoading && <Spinner />}
      {cartItems.length === 0 ? (
        <p>Cart is Freaking Empty</p>
      ) : (
        <Fragment>
          <div className={classes["checkout-details"]}>
            <h2 style={{ backgroundColor: "red" }}>Pay with Paystack</h2>
            <h4>Checkout Details</h4>

            <p>Please check if the details are correct before proceeding</p>
            <Card>
              <form action="" onSubmit={confirmHandlerPaystack}>
                <div
                  className={`${classes.control} ${
                    !formValidity.firstName ? classes.invalid : ""
                  }`}>
                  <label>
                    <b>First Name:</b>
                  </label>
                  <input
                    type="text"
                    ref={firstNameInputRef}
                    placeholder="please enter your first name here"
                  />
                  {!formValidity.firstName && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.surname ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">
                    <b>Surname:</b>
                  </label>
                  <input
                    type="text"
                    ref={surnameInputRef}
                    placeholder="please enter your surname here"
                  />
                  {!formValidity.surname && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.residentialAddress ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">
                    <b>Residential Address:</b>
                  </label>
                  <input
                    type="text"
                    ref={residentialAddressInputRef}
                    placeholder="please enter your house address here"
                  />
                  {!formValidity.residentialAddress && (
                    <p>Please fill out the input</p>
                  )}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.town ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">
                    <b>Town:</b>
                  </label>
                  <input
                    type="text"
                    ref={townInputRef}
                    placeholder="please enter the town you reside here"
                  />
                  {!formValidity.town && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.state ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">
                    <b>State:</b>
                  </label>
                  <input
                    type="text"
                    ref={stateInputRef}
                    placeholder="please enter the state you reside here"
                  />
                  {!formValidity.state && <p>Please fill out the input</p>}
                </div>
                <div
                  className={`${classes.control} ${
                    !formValidity.phoneNumber ? classes.invalid : ""
                  }`}>
                  <label htmlFor="">
                    <b>Phone Number:</b>
                  </label>
                  <input
                    type="text"
                    ref={phoneNumberInputRef}
                    placeholder="please enter your phone number here"
                  />
                  {!formValidity.phoneNumber && (
                    <p>Phone number should be 11 digits</p>
                  )}
                </div>
                <div className={classes.action}>
                  <Button onClick={onCancel} className={classes.btn}>
                    Cancel
                  </Button>
                  <Button className={classes.btn} onClick={confirmHandlerPaystack}>
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
              {cartItems.map((item) => {
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

export default PayWithPaystack;
