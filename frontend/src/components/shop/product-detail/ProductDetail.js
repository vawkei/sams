import classes from "./ProductDetail.module.css";
import { useParams, useNavigate } from "react-router-dom";
//import { DUMMY_ITEMS } from "../products/DummyItems";
import {
  getSingleProduct,
  updateReview,
  deleteProductReview,
  productActions,
} from "../../../store/product/productIndex";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions, saveCartDb } from "../../../store/cart/cartIndex";
import StarsRating from "react-star-rate";
import Spinner from "../../ui/spinner/Spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [productReview, setProductReview] = useState("");
  const [star, setStar] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  var nairaSymbol = "\u20A6";

  const backToProducts = () => {
    navigate("/shop");
  };

  const { product, message, isLoading } = useSelector((state) => state.product);
  console.log(product);

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const cartItems = useSelector((state) => state.cart.cartItems);
  //console.log(cartItems);

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const currentUserCart = cartItems.find((item) => item._id === id);
  //console.log(currentUserCart);

  const isItemAdded = cartItems.findIndex((item) => item._id === id);
  //console.log(isItemAdded);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const deleteReviewHandler = async (productID) => {
    await dispatch(deleteProductReview(productID));
    await dispatch(getSingleProduct(id));
  };

  const showEditFormHandler = () => {
    setShowEditForm(true);
  };
  const showEditFormHandlerFalse = () => {
    setShowEditForm(false);
  };

  const editReviewHandler = async (e, productID) => {
    e.preventDefault();

    if (!star || !productReview) {
      console.log("Fields cant be empty!!!");
      return;
    }

    const formData = {
      star: star,
      productReview: productReview,
      userId: user._id,
    };

    try {
      await dispatch(updateReview({ id: productID, formData }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (message === "Review updated") {
      dispatch(getSingleProduct(id));
      setShowEditForm(false);
    }
    dispatch(productActions.RESET_PRODUCT_STATE());
  }, [navigate, message, id]);

  //aadToCartHandler:
  const addToCartHandler = async (product) => {
    dispatch(cartSliceActions.ADD_TO_CART(product));
    await dispatch(
      saveCartDb({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  //decreaseCartHandler:
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
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
        {product?._id === id ?(
          <>
              <div className={classes["product-detail-container"]}>
            <div className={classes.top}>
              <h2>Product Detail</h2>

              <p onClick={backToProducts}>&larr; Back to Products</p>
            </div>
            <div className={classes["content"]}>
              {/* ====left-hand side starts here ================================================*/}
              <div className={classes["main-image"]}>
                <div className={classes["image-div"]}>
                  <img src={product?.image} alt="meal" />
                </div>

                <Card className={classes["product-reviews"]}>
                  {product?.ratings.length < 1 ? (
                    <p>
                      <b>There are no reviews for this product</b>
                    </p>
                  ) : (
                    <>
                      <h2>
                        <b>Product Review</b>
                      </h2>
                      {product?.ratings.map((rating) => {
                        return (
                          //============= reviews========================================
                          <div className={classes.rating} key={rating._id}>
                            <div className={classes.star}>
                              <StarsRating value={rating.star} />
                            </div>
                            <p>{rating.productReview}</p>
                            <p>{rating.reviewDate}</p>
                            <h3>
                              <b>{rating.name}</b>
                            </h3>
                            <div className={classes.actionOne}>
                              <Button
                                className={classes.btn}
                                onClick={() =>
                                  deleteReviewHandler(product._id)
                                }>
                                Delete review
                              </Button>
                              <Button
                                className={classes.btn}
                                onClick={showEditFormHandler}>
                                Edit review
                              </Button>
                            </div>
                            {/*=====editForm starts here==================================== */}
                            {showEditForm && (
                              <form
                                action=""
                                onSubmit={(e) =>
                                  editReviewHandler(e, product._id)
                                }>
                                <Card className={classes.editCardClass}>
                                  <div className={classes["edit-content"]}>
                                    <h3>{product?.name}</h3>
                                    <p>Rating:</p>
                                    <div className={classes.ratingContainer}>
                                      <StarsRating
                                        value={star}
                                        onChange={(star) => setStar(star)}
                                      />
                                    </div>
                                    <p>
                                      <b>Leave a review</b>
                                    </p>
                                    <textarea
                                      name=""
                                      id=""
                                      rows="5"
                                      value={productReview}
                                      onChange={(e) =>
                                        setProductReview(e.target.value)
                                      }></textarea>
                                    <div className={classes["edit-action"]}>
                                      <Button
                                        onClick={showEditFormHandlerFalse}>
                                        Cancel
                                      </Button>{" "}
                                      <Button>Submit</Button>
                                    </div>
                                  </div>
                                </Card>
                              </form>
                            )}
                            {/*== morftide ends here ===========================*/}
                          </div>
                        );
                      })}
                    </>
                  )}
                </Card>

                {/* ====left-handside ends here================================================*/}
              </div>
              {/* ====right-handside starts here=================================== */}
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
                    <Button onClick={() => decreaseCartHandler(product)}>
                      -
                    </Button>{" "}
                    {currentUserCart.productCartQty}
                    <Button onClick={() => addToCartHandler(product)}>+</Button>
                  </div>
                )}
                {product?.quantity === 0 ? (
                  <Button className={classes.btnRed} disable>
                    Out of Stock
                  </Button>
                ) : (
                  <div className={classes.action}>
                    <Button
                      className={classes.btn}
                      onClick={() => addToCartHandler(product)}>
                      Add to Cart
                    </Button>
                  </div>
                )}

                <Card>
                  <h3>{product?.description}</h3>
                </Card>
              </Card>
            </div>
          </div>
          </>
        ) : (
          <Spinner />
        )}
          
        </>
      )}
    </>
  );
};

export default ProductDetail;

// let lisalipps = user.cartItems;
// let x = lisalipps.map((item) => item.productCartQty);
// console.log(x[0]);

// console.log(user.cartItems)

// user.cartItems.map((item) => {
//   let y = item.productCartQty;
//   console.log(y)
//   if (item.productCartQty < 1) {
//     setNotificationTitle("Item Added");
//     setNotificationMessage(`${product.name} added to cart`);
//   } else {
//     setNotificationTitle("Item Increased");
//     setNotificationMessage(`${product.name} increased by 1`);
//   }
// });

// if(user.cartItems.productCartQty < 1){
//   setNotificationTitle("Item Added");
//   setNotificationMessage(`${product.name} added to cart`);
// }else{
//   setNotificationTitle("Item Added");
//   setNotificationMessage(`${product.name} increased by 1`);
// }
