import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartSliceActions, saveCartDb } from "../../store/cart/cartIndex";
import VerifyCoupon from "./VerifyCoupon";
import { couponSliceActions } from "../../store/coupon/couponIndex";

const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const {coupon} = useSelector((state)=>state.coupon);

  const cart = useSelector((state)=>state.cart)
  console.log(cart)

  console.log(cartTotalAmount);

  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);

  const navigate = useNavigate();

  var nairaSymbol = "\u20A6";
  const dispatch = useDispatch();

  async function increaseProduct(item) {
    dispatch(cartSliceActions.ADD_TO_CART(item));
    await dispatch(
      saveCartDb({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  }
  async function decreaseProduct(item) {
    dispatch(cartSliceActions.DECREASE_CART(item));
    await dispatch(
      saveCartDb({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  }
  async function removeProductHandler(item) {
    dispatch(cartSliceActions.REMOVE_ITEM(item));
    await dispatch(
      saveCartDb({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  }

  async function clearCart() {
    // Assuming you want to reset the Redux state
    dispatch(cartSliceActions.RESET_CART());
    dispatch(couponSliceActions.REMOVE_COUPON());

    // Dispatch the action to save an empty cart to the database
    await dispatch(saveCartDb({ cartItems: [] }));
  };

  useEffect(() => {
    dispatch(cartSliceActions.CART_TOTAL_AMOUNT(coupon));
  }, [dispatch, cartItems, cartTotalAmount,coupon]);

  const shortenText = (text, n) => {
    if (text.length > 15) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const onCheckoutHandler = () => {
    if (isLoggedIn) {
      //navigate("/checkout-details");
      navigate("/payment-method");
    } else {
      navigate("/login?redirect=cart");
      // navigate("/login?redirect=cart")
    }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <p style={{ marginLeft: "6rem" }}>Cart is Freaken Empty</p>
      ) : (
        <div className={classes.container}>
          <p>
            <b>{cartItems.length}</b> item(s) in cart.
          </p>
          {cartItems.map((item) => {
            return (
              <Card key={item.id} className={classes.product}>
                <div className={classes.left}>
                  <div className={classes.image}>
                    <img
                      src={item.image}
                      alt={item.name}
                      // style={{ width: "10rem" }} always proves difficult to manipulate it, if u code your width here. do it in the css file.
                    />
                  </div>
                  <div className={classes.content}>
                    <p>
                      {" "}
                      <b> {shortenText(item.name, 15)}</b>
                    </p>
                    <p>
                      <b>Price: </b> {nairaSymbol}
                      {item.price.toLocaleString()}
                    </p>

                    <p>
                      <b>Total: </b>
                      {nairaSymbol}
                      {(item.price * item.productCartQty).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Card className={classes.right}>
                  <div>
                    <FaTrashAlt
                      size={25}
                      color="red"
                      className={classes.trash}
                      onClick={() => removeProductHandler(item)}
                    />
                  </div>

                  <div className={classes.counter}>
                    <Button
                      className={classes.btn}
                      onClick={() => decreaseProduct(item)}>
                      -
                    </Button>
                    <p>{item.productCartQty}</p>
                    <Button
                      className={classes.btn}
                      onClick={() => increaseProduct(item)}>
                      +
                    </Button>
                  </div>
                </Card>
              </Card>
            );
          })}
          <>
            {cartItems.length > 0 ? (
              <div className={classes["clearcart-checkout"]}>
                <Card className={classes.checkoutSummary}>
                  <h2>Cart Summary</h2>
                  <hr />
                  <div className={classes.subtotal}>
                    <h5>Subtotal:</h5>
                    <p>
                      <b>
                        {nairaSymbol}
                        {cartTotalAmount.toLocaleString()}
                      </b>
                    </p>
                  </div>

                  <VerifyCoupon />

                  <p className={classes.deliveryParagraph}>
                    Delivery fees not included yet.
                  </p>
                  <div className={classes.action}>
                    <Button onClick={clearCart} className={classes.btn1}>
                      Clear Cart
                    </Button>
                    <Button
                      className={classes.btn2}
                      onClick={onCheckoutHandler}>
                      Checkout ({nairaSymbol}
                      {cartTotalAmount.toLocaleString()})
                    </Button>
                  </div>
                </Card>
              </div>
            ) : null}
          </>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;

