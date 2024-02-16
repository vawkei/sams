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
