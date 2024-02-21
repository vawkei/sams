//=============================codeA starts here====================================


const express = require("express");
const router = express.Router();

const {authenticateUser,adminOnly} = require("../middlewares/authenticate-user");
const {initializePayment,webhook} = require("../controllers/paystackController");

//paystack routes
router.post("/acceptpayment", express.json(), initializePayment.acceptPayment);

router.post("/verifypayment",express.json(), initializePayment.verifyPayment);

router.post("/charge",express.json(), initializePayment.initiateCardPayment);

// router.post("/refundOrder",express.json(),authenticateUser,adminOnly, refundOrder)

// router.post(
//   "/webhook",,
//   express.raw({ type: "application/json" }),
//   webhook
// );

router.post(
  "/webhook",
  express.json(),
  webhook
);

module.exports = router;
//=============================codeA stops here====================================



// ctrl + shift + c is used to copy from cli


































//codeB
// const express = require("express");
// const router = express.Router();
// const {
//   initializePayment,
//   webhook,
// } = require("../controllers/paystackController");

// module.exports = () => {
//   router.post(
//     "/acceptpayment",
//     express.json(),
//     initializePayment.acceptPayment
//   );
//   router.post(
//     "/verifypayment",
//   
