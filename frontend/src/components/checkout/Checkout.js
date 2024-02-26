// import classes from "./Checkout.module.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders } from "../../store/order/orderIndex";
// import Button from "../ui/button/Button"
// import io from "socket.io-client";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const orders = useSelector((state) => state.order.orders);
//   console.log(orders);

//   const [transactionData, setTransactionData] = useState(null);

//   useEffect(() => {
//     const getorders = async () => {
//       await dispatch(getOrders());
//     };
//     const clearer = setTimeout(async() => {
//      await getorders()
//     }, 5000);

//     return () => clearTimeout(clearer);

//   }, [dispatch]);

//   useEffect(() => {
//     // const socket = io(process.env.REACT_APP_BACKEND_URL);
//     const socket = io(
//       `${process.env.REACT_APP_BACKEND_URL}/api/v1/paystack/webhook`,
//       {
//         path: "/api/v1/paystack/webhook",
//         // The path is part of the URL used to establish the Socket.IO connection. It helps route the connection to the appropriate namespace
//       }
//     );

//     socket.on("connect", () => {
//       console.log("Connected to WebSocket server");

//       // Set up event listener after the connection is established
//       socket.on("transactionSuccess", (transactionData) => {
//         console.log("Transaction successful:", transactionData);
//         console.log("Received transactionSuccess event:", transactionData);
//         setTransactionData(transactionData);
//       });
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Connection error:", error);
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from WebSocket server");
//     });

//     // Clean up the effect
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const navigateHandler = () => {
//     navigate("/order-history");
//   };

//   return (
//     <div className={classes["checkout-container"]}>
//       <h2>Checkout Successful</h2>
//       <p>Thank you for your purchase</p>
//       <p>Transaction Data: {JSON.stringify(transactionData)}</p>
//       {/* <p>{webhookResponse}</p> */}
//       <Button onClick={navigateHandler} className={classes.btn}>Go to Order History</Button>
//     </div>
//   );
// };

// export default Checkout;

// // Checkout.js:82 Connection error: Error: xhr poll error
// //     at n.value (transport.js:38:37)
// //     at n.<anonymous> (polling.js:218:18)
// //     at Lj.emit (index.mjs:136:20)
// //     at n.value (polling.js:320:14)
// //     at polling.js:294:30
























































//from my previous commit========================================================
// import classes from "./Checkout.module.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders, updateOrderWebhook } from "../../store/order/orderIndex";
// import Button from "../ui/button/Button";
// import io from "socket.io-client";
// import { getWebhookEvent } from "../../store/paystack/paystackIndex";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const orders = useSelector((state) => state.order.orders);
//   console.log(orders.slice(0, 10));

//   const webhookResponse = useSelector(
//     (state) => state.paystack.webhookResponse
//   );
//   console.log(webhookResponse);

//   // const [transactionData, setTransactionData] = useState(null);


//   //no.1
//   useEffect(() => {
//     const getorders = async () => {
//       await dispatch(getOrders());
//       await dispatch(getWebhookEvent());
//     };

//     const clearer = setTimeout(async () => {
//       await getorders();
//     }, 5000);

//     return () => clearTimeout(clearer);
//   }, [dispatch]);

//   //no.2
//   useEffect(() => {
//     const updateorderwebhook = async () => {
//       await dispatch(updateOrderWebhook({webhookResponse}));
//     };

//     const clearer = setTimeout(async () => {
//       await updateorderwebhook();
//     }, 8000);
//     return () => clearTimeout(clearer);
//   }, [dispatch]);

//   // useEffect(() => {
//   //   // const socket = io(process.env.REACT_APP_BACKEND_URL);
//   //   const socket = io(
//   //     `${process.env.REACT_APP_BACKEND_URL}/api/v1/paystack/webhook`,
//   //     {
//   //       path: "/api/v1/paystack/webhook",
//   //       // The path is part of the URL used to establish the Socket.IO connection. It helps route the connection to the appropriate namespace
//   //     }
//   //   );
//   //   socket.on("connect", () => {
//   //     console.log("Connected to WebSocket server");
//   //     // Set up event listener after the connection is established
//   //     socket.on("transactionSuccess", (transactionData) => {
//   //       console.log("Transaction successful:", transactionData);
//   //       console.log("Received transactionSuccess event:", transactionData);
//   //       setTransactionData(transactionData);
//   //     });
//   //   });
//   //   socket.on("connect_error", (error) => {
//   //     console.error("Connection error:", error);
//   //   });
//   //   socket.on("disconnect", () => {
//   //     console.log("Disconnected from WebSocket server");
//   //   });
//   //   // Clean up the effect
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, []);
//   const navigateHandler = () => {
//     navigate("/order-history");
//   };
//   return (
//     <div className={classes["checkout-container"]}>
//       <h2>Checkout Successful</h2>
//       <p>Thank you for your purchase</p>
//       <p>Transaction Data: {JSON.stringify(webhookResponse)}</p>
//       {/* <p>{webhookResponse}</p> */}
//       <Button onClick={navigateHandler}>Go to Order History</Button>
//     </div>
//   );
// };
// export default Checkout;


import classes from "./Checkout.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/order/orderIndex";
import Button from "../ui/button/Button"
import io from "socket.io-client";
import { getWebhookEvent } from "../../store/paystack/paystackIndex";


const Checkout = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const orders = useSelector((state) => state.order.orders);
  console.log(orders.slice(0,10));
  
  const webhookResponse = useSelector((state)=>state.paystack.webhookResponse)
  console.log(webhookResponse)

  // const [transactionData, setTransactionData] = useState(null);
  
  
  useEffect(() => {
    const getorders = async () => {
      await dispatch(getOrders());
      await dispatch(getWebhookEvent())

    };
    const clearer = setTimeout(async() => {
     await getorders()
    }, 5000);

    return () => clearTimeout(clearer);
  
  }, [dispatch]);


  const navigateHandler = () => {
    navigate("/order-history");
  };
  return (
    <div className={classes["checkout-container"]}>
      <h2>Checkout Successful</h2>
      <p>Thank you for your purchase</p>
      <p>Transaction Data: {JSON.stringify(webhookResponse)}</p>
      {/* <p>{webhookResponse}</p> */}
      <Button onClick={navigateHandler}>Go to Order History</Button>
    </div>
  );
};
export default Checkout;