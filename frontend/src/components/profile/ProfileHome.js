import { useEffect, useState } from "react";
import classes from "./ProfileHome.module.css";
import Card from "../ui/card/Card";
import Spinner from "../ui/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../store";
import ProfileHeader from "./ProfileHeader";
import { getOrders } from "../../store/order/orderIndex";

const ProfileHome = () => {
  const dispatch = useDispatch();
  var nairaSymbol = "\u20A6";

  const { user, isLoading } = useSelector((state) => state.auth);
  // console.log(user);
  const { orders } = useSelector((state) => state.order);
  // console.log(orders);

  const [showRefreshMessage, setShowRefreshMessage] = useState(true);

  //Getting out the Time of the last order:==========================================
  const LastOrder = orders.slice(0, 1);
  // console.log(LastOrder);

  const LastOrderTime = LastOrder.map((b) => {
    let a = b.orderTime;
    let x = new Date(a).toLocaleString();
    return x;
  });
  // console.log(LastOrderTime);

  //Getting the total amount the user has spent:=========================================
  const orderAmount = orders.reduce((a, b) => {
    return a + b.orderAmount;
  }, 0);
  // console.log(orderAmount);

  let timeClearer;

  useEffect(() => {
    if (user === null) {
      dispatch(getSingleUser());
      dispatch(getOrders());
    }

    timeClearer = setTimeout(() => {
      setShowRefreshMessage(false);
    }, 3000);

    return () => clearTimeout(timeClearer);
  }, [
    dispatch,
    user,
    orders,
    orderAmount,
    LastOrder,
    LastOrderTime,
    timeClearer,
    showRefreshMessage,
  ]);

  //   useEffect(()=>{
  //     if( isLoggedIn && user){
  //       user?.name || ""
  //       user?.email || ""
  //       user?.phone || ""
  //       user?.address ||""
  //       user?.surname || ""
  //       user?.state || ""
  //       user?.town || ""
  //     }
  //   },[user]);

  return (
    <div className={classes.container}>
      {!user ? (
        ""
      ) : (
        <>
          {isLoading && <Spinner />}
          <ProfileHeader />
          {showRefreshMessage && (
            <p>Please refresh page to see details in full</p>
          )}
          <h2>
            {user?.name} {user?.surname}
          </h2>
          <Card className={classes.cardClass}>
            <div className={classes["main-image"]}>
              <img src={user?.photo} alt="profile-image" />
            </div>
            <div className={classes.content}>
              <h4>
                {user?.name} {user?.surname}
              </h4>
              <p className={classes.email}>{user?.email}</p>
              <p>{user?.phone}</p>
              <p>{user?.address}</p>
              <p>{user?.town}</p>
              <p>{user?.state}</p>
              <p>
                <b>Total Amount Spent: </b>
                {nairaSymbol}
                {orderAmount.toFixed(2)}
              </p>
              <p>
                <b>Time Of Last Order: </b>
                {LastOrderTime}
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProfileHome;
