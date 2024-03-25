import classes from "./ProductReview.module.css";
import StarsRating from "react-star-rate";
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import {
  deleteProductReview,
  getSingleProduct,
  updateReview,
} from "../../../store/product/productIndex";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductReview = () => {
  const { id } = useParams();

  //states, dispatch, useSelector, navigate:
  const [showEditForm, setShowEditForm] = useState(false);
  const [productReview, setProductReview] = useState("");
  const [star, setStar] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.product);
  console.log(product);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  //functions:
  //1.
  const deleteReviewHandler = async (productID) => {
    await dispatch(deleteProductReview(productID));
    await dispatch(getSingleProduct(id));
  };
  //2.
  const showEditFormHandler = () => {
    setShowEditForm(true);
  };
  //3.
  const showEditFormHandlerFalse = () => {
    setShowEditForm(false);
  };
  //4.
  const backToProductDetails = (id) => {
    navigate(`/product-detail/${id}`);
  };
  //5.
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

  return (
    <Card className={classes.reviewContainer}>
      
      <div className={classes.topP}>
      <p
        onClick={() => backToProductDetails(product._id)}>
        &larr; Back to Products
      </p>
      </div>
      
      <div className={classes.mainContent}>
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
            <div className={classes.content}>
              <p>{rating.productReview}</p>
              <p>
                <b>{rating.reviewDate}</b>
              </p>
            </div>
            <h3>
              <b>{rating.name}</b>
            </h3>
            <div className={classes.actionOne}>
              {rating.userId === user?._id ? (
                <>
                  <Button
                    className={classes.btn}
                    onClick={() => deleteReviewHandler(product._id)}>
                    Delete
                  </Button>
                  <Button className={classes.btn} onClick={showEditFormHandler}>
                    Edit
                  </Button>
                </>
              ) : (
                ""
              )}
            </div>
            {/*=====editForm starts here==================================== */}
            {showEditForm && (
              <div className={classes.backdrop}>
                <form
                  action=""
                  onSubmit={(e) => editReviewHandler(e, product._id)}>
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
                        <Button onClick={showEditFormHandlerFalse}>
                          Cancel
                        </Button>{" "}
                        <Button>Submit</Button>
                      </div>
                    </div>
                  </Card>
                </form>
              </div>
            )}
            {/*== morftide ends here ===========================*/}
          </div>
        );
      })}
      </div>
    </Card>
  );
};

export default ProductReview;