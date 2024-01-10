import classes from "./ProductDetail.module.css";
import { useParams, useNavigate } from "react-router-dom";
//import { DUMMY_ITEMS } from "../products/DummyItems";
import { getSingleProduct } from "../../../store/product/productIndex";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions, saveCartDb } from "../../../store/cart/cartIndex";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  var nairaSymbol = "\u20A6";

  const backToProducts = () => {
    navigate("/shop");
  };

  const { product } = useSelector((state) => state.product);
  //console.log(product);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const currentUserCart = cartItems.find((item) => item._id === id);
  console.log(currentUserCart);

  const isItemAdded = cartItems.findIndex((item) => item._id === id);
  console.log(isItemAdded);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  const addToCartHandler = async (product) => {
    dispatch(cartSliceActions.ADD_TO_CART(product));
    await dispatch(
      saveCartDb({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const decreaseCartHandler = async (product) => {
    dispatch(cartSliceActions.DECREASE_CART(product));
    await dispatch(
      saveCartDb({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  //const item = DUMMY_ITEMS.find((item) => item.id === id);
  //console.log(DUMMY_ITEMS)
  //console.log(item);

  return (
    <div className={classes["product-detail-container"]}>
      <h2>Product Detail</h2>

      <p
        style={{ margin: "3rem 0", cursor: "pointer" }}
        onClick={backToProducts}>
        &larr; Back to Products
      </p>
      <div className={classes["content"]}>
        <div className={classes["main-image"]}>
          <img src={product?.image} alt="meal" />
        </div>
        <Card className={classes.details}>
          <h2>{product?.name}</h2>
          <ul className={classes.ul}>
            <li>
              <b>Price:</b>{" "}
              <span style={{ color: "red" }}>
                <b>
                  {" "}
                  {nairaSymbol} {product?.price}
                </b>
              </span>
            </li>
            <li>
              <b>Category:</b> {product?.category}
            </li>
            <li>
              <b>Sku:</b> {product?._id}
            </li>
            <li>
              <b>Quantity in Stock:</b> {product?.quantity}
            </li>
            <li>
              <b>Views:</b> {product?.productViews.viewCount}
            </li>
            <li>
              <b>Sold:</b> {product?.sold}
            </li>
          </ul>

          {isItemAdded < 0 ? null : (
            <div className={classes.action}>
              <Button onClick={() => decreaseCartHandler(product)}>-</Button>{" "}
              {currentUserCart.productCartQty}
              <Button onClick={() => addToCartHandler(product)}>+</Button>
            </div>
          )}
          {isItemAdded < 0 ? (
            <div className={classes.action}>
              <Button
                className={classes.btn}
                onClick={() => addToCartHandler(product)}>
                Add to Cart
              </Button>
            </div>
          ) : null}

          <Card>
            <h3>{product?.description}</h3>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
