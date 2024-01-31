const express = require("express");
const router = express.Router();

const {initializePayment,webhook} = require("../controllers/paystackController");


//paystack routes
router.post("/acceptpayment", express.json(), initializePayment.acceptPayment);

router.get("/verifypayment/:reference",express.json(), initializePayment.verifyPayment);

router.post("/charge",express.json(), initializePayment.initiateCardPayment);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

module.exports = router;

// ctrl + shift + c is used to copy from cli
