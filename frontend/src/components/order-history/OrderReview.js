import classes from "./OrderReview.module.css";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, productActions } from "../../store/product/productIndex";
import { review } from "../../store/product/productIndex";
import { useEffect, useState } from "react";
import StarsRating from "react-star-rate";
import Loader from "../ui/loader/Loader";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";
// import StarRatings from "react-star-ratings";

const OrderReview= () => {
  const { id } = useParams();
  console.log(id);

  const [productReview, setProductReview] = useState("");
  const [star, setStar] = useState(0);
  //const [rate, setRating] = useState(0);

  const { product, isLoading, message } = useSelector((state) => state.product);
  //console.log(product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    if(!star || !productReview){
        console.log("Fields cant be empty!!!")
        return
    };

    const formData = {star:star,productReview:productReview}

    try{
        await dispatch(review({id:id,formData}))
        
    }catch(error){
        console.log(error)
    }
   
   
  };

  useEffect(()=>{
    if(message === "Review created"){
      navigate("/order-history")
    }
    dispatch(productActions.RESET_PRODUCT_STATE());
  },[message])

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Review Product</h1>
      {isLoading && <Loader />}
      <form action="" onSubmit={onSubmitHandler}>
        <Card className={classes.cardClass}>
          <div className={classes["main-image"]}>
            <img src={product?.image} />
          </div>
          <div className={classes.content}>
            <h3>{product?.name}</h3>
            <p>Rating:</p>
            <div className={classes.ratingContainer}>
              <StarsRating value={star} onChange={(star) => setStar(star)} />
            </div>
            <p>
              <b>Leave a review</b>
            </p>
            <textarea
              name=""
              id=""
              rows="5"
              value={productReview}
              onChange={(e) => setProductReview(e.target.value)}></textarea>
            <div className={classes.action}>
              <Button>Submit</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default OrderReview;
