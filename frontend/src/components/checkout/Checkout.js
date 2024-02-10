//=============================codeA starts here====================================

//This is the code used when working without/before the use of web socket.
// import classes from "./Checkout.module.css";
// import Button from "../ui/button/Button";
// import { useNavigate } from "react-router-dom";
// import { webhookresponse } from "../../store/paystack/paystackIndex";
// import { useEffect } from "react";
// import {useSelector,useDispatch} from "react-redux";

// const Checkout = () => {

//  const {webhookResponse} = useSelector((state)=>state.paystack);
//  console.log(webhookResponse);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const navigateHandler = () => {
//     navigate("/order-history");
//   };

//   useEffect(()=>{
//      dispatch(webhookresponse())
//   },[dispatch]);

//   return (
//     <div className={classes["checkout-container"]}>
//       <h2>Checkout Successful</h2>
//       <p>Thank you for your purchase</p>
//       <div className={classes.action}>
//         <Button className={classes.btn} onClick={navigateHandler}>
//           View Order Status
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

//=============================codeB starts here====================================

//This is the code used when working with the web socket

import classes from "./Checkout.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to the Socket.IO server
    // const socket = io(process.env.REACT_APP_BACKEND_URL); 
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`,{
      path:`${process.env.REACT_APP_BACKEND_URL}/webhook` ,
      // autoConnect:false,
      transports:['websocket']
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("transactionSuccess", (transactionData) => {
      console.log("Transaction successful:", transactionData);
      // Update your Redux state or local state here if needed
      // For example, if using Redux: dispatch(setTransactionSuccess(transactionData));
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Clean up the effect
    return () => {
      socket.disconnect();
    };
  }, []);

  const navigateHandler = () => {
    navigate("/order-history");
  };

  return (
    <div className={classes["checkout-container"]}>
      <h2>Checkout Successful</h2>
      <p>Thank you for your purchase</p>

      {/* <p>{webhookResponse}</p> */}

      <button onClick={navigateHandler}>Go to Order History</button>
    </div>
  );
};

export default Checkout;
