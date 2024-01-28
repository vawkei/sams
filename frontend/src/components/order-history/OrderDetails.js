import classes from "./OrderDetails.module.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../../store/order/orderIndex";
import Loader from "../ui/loader/Loader";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
// import Loader from "../../ui/loader/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  console.log(id);

  var nairaSymbol = "\u20A6";

  const navigate = useNavigate();
  
  const navigateHandler = (id) => {
    navigate(`/order-review/${id}`);
  };
  const navigateToOrders = ()=>{
    navigate(`/order-history`)
  };

  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state) => state.order);
  console.log(order);

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.heading}>
        <h2>Order Details</h2>
      </div>

      {order?.length === 0 ? (
        <p>No order found</p>
      ) : (
        <div className={classes["orderDetails-container"]}>
          <Button className={classes.btn1} onClick={navigateToOrders}>&larr; Back to orders</Button>
          {/* <h4>{`Here are your orders || ${order?.firstName}'s orders`}</h4> */}
          <div className={classes.intro}>
            <h4>{`Here are your orders || ${order?.firstName}'s orders`}</h4>
            <h2>
              <b>Order ID: {order?._id}</b>
            </h2>
          </div>
          <Card className={classes.cardClass}>
            <ul>
              {order?.cartItems.map((item, index) => {
                return (
                  <Card className={classes.li} key={item._id}>
                    <li key={index} className={classes["item-container"]}>
                      <div className={classes.left}>
                        <div className={classes["main-image"]}>
                          <img src={item.image} />
                        </div>
                        <p>{item.name}</p>
                      </div>
                      <div className={classes.right}>
                        <h3>
                          {nairaSymbol} {item?.price}
                        </h3>
                        <h3>Qty: {item.productCartQty}</h3>
                        <div className={classes.action}>
                          <Button onClick={() => navigateHandler(item._id)}>
                            Review Product
                          </Button>
                        </div>
                      </div>
                    </li>
                  </Card>
                );
              })}
              <div className={classes.bottom}>
                <h3>
                  <b>Total Order Amount: </b>
                  {nairaSymbol}
                  {order?.orderAmount}
                </h3>
              </div>
            </ul>
          </Card>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
