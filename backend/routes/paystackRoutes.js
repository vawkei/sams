//=============================codeA starts here====================================
//=============When working without the web socket===========================

//This code is very very perfect for all the routes here, but for us to work with the web sockets, passing them in our webhook,then we have to use the codeB.But acceptpayment,verifypayment and webhook. work excellently well.

// const express = require("express");
// const router = express.Router();

// const {initializePayment,webhook} = require("../controllers/paystackController");

// //paystack routes
// router.post("/acceptpayment", express.json(), initializePayment.acceptPayment);

// //router.get("/verifypayment/:reference",express.json(), initializePayment.verifyPayment);
// router.post("/verifypayment",express.json(), initializePayment.verifyPayment);

// router.post("/charge",express.json(), initializePayment.initiateCardPayment);

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   webhook
// );

// module.exports = router;
//=============================codeA stops here====================================

//codeB
//===================When working with the web socket===========================
//This allows you to pass the io object to the webhook function when defining the route.

// const express = require("express");
// const router = express.Router();
// const {
//   initializePayment,
//   webhook,
// } = require("../controllers/paystackController");

// module.exports = (io) => {
//   router.post(
//     "/acceptpayment",
//     express.json(),
//     initializePayment.acceptPayment
//   );
//   router.post(
//     "/verifypayment",
//     express.json(),
//     initializePayment.verifyPayment
//   );
//   router.post("/charge", express.json(), initializePayment.initiateCardPayment);


//   router.post(
//     "/webhook",
//     express.json(), // Use express.json() to parse JSON payloads
//     webhook(io)
//   );

//   return router;
// };

// ctrl + shift + c is used to copy from cli



const express = require("express");
const router = express.Router();
const {
  initializePayment,
  webhook,
} = require("../controllers/paystackController");

module.exports = () => {
  router.post(
    "/acceptpayment",
    express.json(),
    initializePayment.acceptPayment
  );
  router.post(
    "/verifypayment",
    express.json(),
    initializePayment.verifyPayment
  );
  router.post("/charge", express.json(), initializePayment.initiateCardPayment);

  router.post(
    "/webhook",
    express.json(), // Use express.json() to parse JSON payloads
    webhook
  );

  // router.post(
  //   "/webhook",
  //   express.json(), // Use express.json() to parse JSON payloads
  //   webhook(webhookNamespace)
  // );

  return router;
};
