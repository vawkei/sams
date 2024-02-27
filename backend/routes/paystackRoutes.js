//=============================codeA starts here====================================


const express = require("express");
const router = express.Router();

const {authenticateUser,adminOnly} = require("../middlewares/authenticate-user");
const {initializePayment,webhook,getWebhookEvent, refundOrder} = require("../controllers/paystackController");

//paystack routes
router.post("/acceptpayment", express.json(), initializePayment.acceptPayment);

router.post("/verifypayment",express.json(), initializePayment.verifyPayment);

router.post("/charge",express.json(), initializePayment.initiateCardPayment);

router.post("/refundOrder",express.json(),authenticateUser,adminOnly, refundOrder)

//to post/send the webhook from paystack, router.post()
router.post("/webhook",express.json(),webhook);

//we have got the webhook in our db, to get it to our server
router.get("/getWebhookEvent",express.json(), authenticateUser, getWebhookEvent);

module.exports = router;
//=============================codeA stops here====================================



// ctrl + shift + c is used to copy from cli













