const https = require("https");

const axios = require("axios");

const Orders = require("../models/orders");

const callbackUrl = "https://your-backend-url.com/paystack-callback"; // Replace with your actual backend URL. this is for card payment

const payStack = {
  //acceptPayment controller=========================================================:
  acceptPayment: async (req, res) => {
    //request body from the client:
    const email = req.body.email;
    const amount = req.body.amount;
    if (!email || !amount) {
      res.status(400).json({ msg: "EMAIL and AMOUNT is needed" });
      return;
    }

    const params = JSON.stringify({
      email: email,
      amount: amount * 100,
    });

    const paystackApiEndpoint =
      "https://api.paystack.co/transaction/initialize";

    try {
      const paystackResponse = await axios.post(paystackApiEndpoint, params, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`, //secret key from the dashboard
          "Content-Type": "application/json",
        },
      });
      console.log("AcceptPayment respnse:", paystackResponse);

      req.session.transactionReference = paystackResponse.data.data.reference;
      res.status(200).json({
        paymentUrl: paystackResponse.data.data.authorization_url,
        ref: paystackResponse.data.data.reference,
      });
    } catch (error) {
      console.log("Error in acceptPayment:", error);
      return res.status(500).json(error);
    }
  },

  //VerifyPayment controller==========================================================:
  verifyPayment: async (req, res) => {
    const referenceFrmDBackend = req.session.transactionReference;
    console.log("Received referenceBackend:", referenceFrmDBackend);

    const { reference } = req.body;
    console.log("Received reference:", reference);
    // dvsgvn2mwh

    try {
      const verifyResponse = await axios.get(
        // "https://api.paystack.co/transaction/initialize";
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`, //secret key from the dashboard
          },
        }
      );
      console.log("verify response:", verifyResponse);
      // res.json({babe:verifyResponse.data})
      if (verifyResponse.data.message === "Verification successful") {
        res.status(200).json({ msg: "Payment verified successfully" });
      } else {
        res.json({ msg: "payment verification failed" });
      }
    } catch (error) {
      console.log("Error in verifyPayment:", error);
      return res.status(500).json(error);
    }
  },

  //initiateCardPayment controller============================================:
  //This is for card payment,i didnt program the app to accept card payment.
  initiateCardPayment: async (req, res) => {
    try {
      const { email, amount } = req.body;

      if (!email || !amount) {
        return res.status(400).json({ error: "Email and amount are required" });
      }

      const params = {
        email: email,
        amount: amount * 100, // Paystack expects amount in kobo
        callback_url: callbackUrl,
      };
      const paystackApiEndpoint =
        "https://api.paystack.co/transaction/initialize";

      const paystackResponse = await axios.post(paystackApiEndpoint, params, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      return res.status(200).json({
        authorization_url: paystackResponse.data.data.authorization_url,
        access_code: paystackResponse.data.data.access_code,
      });
    } catch (error) {
      console.error("Error in initiateCardPayment:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

const initializePayment = payStack;

//codeA
//payWithPaystackWebhook without web socket==============================:

// const crypto = require('crypto')
// const webhook = (req, res) => {
//   try {
//      // Assuming express.raw() middleware is used in the route definition
//      // Create the hash using the raw body
//      const hash = crypto
//        .createHmac('sha512', process.env.PAYSTACK_TEST_SECRET_KEY)
//        .update(req.body, 'utf-8') // Use req.body instead of req.raw
//        .digest('hex');

//      // Log the calculated hash and the received signature
//      console.log('Calculated Hash:', hash);
//      console.log('Received Signature:', req.headers['x-paystack-signature']);

//      if (hash === req.headers['x-paystack-signature']) {
//        // Retrieve the request's body:
//        const event = JSON.parse(req.body); // Use req.body instead of req.raw
//        console.log('Received Paystack Webhook Event:', event);

//        // Do something with the event:
//        if (event && event.event === 'charge.success') {
//          // Handle charge success event
//          console.log('Charge successful:', event.data);
//          return res.status(200).json({ msg: 'Charge successful' });
//        } else {
//          // Invalid signature
//          console.error('Invalid Paystack signature');
//          return res.status(400).json({ msg: 'Invalid Paystack signature' });
//        }
//      } else {
//        // Signatures do not match
//        console.error('Signatures do not match');
//        return res.status(400).json({ msg: 'Signatures do not match' });
//      }
//   } catch (error) {
//      // An error occurred during the processing of the webhook
//      console.error('Error processing webhook:', error);
//      return res
//        .status(500)
//        .json({ msg: 'An error occurred while processing the webhook' });
//   }
//  };

//codeB
//payWithPaystackWebhook with web socket===========================================:
//const webhook = (req, res) => {
  const crypto = require("crypto");
  const webhook = async (req, res) => {
    try {
      const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_TEST_SECRET_KEY)
        
        .update(JSON.stringify(req.body)) // Stringify the object to create a hash
        .digest("hex");
  
      // Log the calculated hash and the received signature
      console.log("Calculated Hash:", hash);
      console.log("Received Signature:", req.headers["x-paystack-signature"]);
      if (hash === req.headers["x-paystack-signature"]) {
        // Retrieve the request's body:
        const event = req.body; // req.body is now a JavaScript object
        console.log("Received Paystack Webhook Event:", event);
        // Do something with the event:
        if (event && event.event === "charge.success") {
          console.log("Emitting transactionSuccess event:", event.data);
          try {
            const order = await Orders.findOne({}).sort({ createdAt: -1 });
            if (!order) {
              return res.status(404).json({ msg: "Order not found" });
            }
            order.paystackWebhook = event.data;
            await order.save();
            // Emit the event to all connected clients
            req.app
              .get("webhookNamespace")
              .emit("transactionSuccess", event.data, (error) => {
                if (error) {
                  console.error(
                    "Error emitting transactionSuccess event:",
                    error
                  );
                } else {
                  console.log("transactionSuccess event emitted successfully");
                }
              });
            // Handle charge success event
            console.log("Charge successful:", event.data);
            return res.status(200).json({ msg: "Charge successful" });
          } catch (databaseError) {
            console.error("Error updating order in the database:", databaseError);
            return res
              .status(500)
              .json({ msg: "Error updating order in the database" });
          }
        } else {
          // Invalid event type or other conditions
          console.error("Invalid Paystack event or conditions");
          return res
            .status(400)
            .json({ msg: "Invalid Paystack event or conditions" });
        }
      } else {
        // Signatures do not match
        console.error("Signatures do not match");
        return res.status(400).json({ msg: "Signatures do not match" });
      }
    } catch (error) {
      // An error occurred during the processing of the webhook
      console.error("Error processing webhook:", error);
      return res
        .status(500)
        .json({ msg: "An error occurred while processing the webhook" });
    }
  };
  




//codeC:
//payWithPaystackWebhook with web socket handling charge.success and refunds======:
// const crypto = require("crypto");
// const webhook = async (req, res) => {
//   try {
//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK_TEST_SECRET_KEY)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     console.log("Calculated Hash:", hash);
//     console.log("Received Signature:", req.headers["x-paystack-signature"]);

//     if (hash === req.headers["x-paystack-signature"]) {
//       const event = req.body;
//       console.log("Received Paystack Webhook Event:", event);

//       if (event && event.event === "charge.success") {
//         console.log("Emitting transactionSuccess event:", event.data);

//         try {
//           const order = await Orders.findOne({}).sort({ createdAt: -1 });
//           if (!order) {
//             return res.status(404).json({ msg: "Order not found" });
//           }
//           if (order.paymentMethod === "Pay on Delivery") {
//             return;
//           }
//           order.paystackWebhook = event.data;
//           await order.save();
//           console.log("paystackWebhook saved to database");

//           req.app.get("webhookNamespace").emit("transactionSuccess", event.data, (error) => {
//             if (error) {
//               console.error("Error emitting transactionSuccess event:", error);
//             } else {
//               console.log("transactionSuccess event emitted successfully");
//             }
//           });

//           console.log("Charge successful:", event.data);
//           return res.status(200).json({ msg: "Charge successful" });
//         } catch (databaseError) {
//           console.error("Error updating order in the database:", databaseError);
//           return res.status(500).json({ msg: "Error updating order in the database" });
//         }
//       } else if (event && event.event === "refund.processed") {
//         // Handle refund processed event
//         console.log("Refund processed:", event.data);
//         return res.status(400).json({ msg: 'Error handling refund processed event' });
//       } else if (event && event.event === "refund.pending") {
//         // Handle refund pending event
//         console.log("Refund pending:", event.data);
//         return res.status(400).json({ msg: 'Error handling refund pending event' });
//       } else {
//         console.error("Unexpected Paystack event type:", event.event);
//         return res.status(400).json({ msg: 'Unexpected Paystack event type' });
//       }
//     } else {
//       console.error("Signatures do not match");
//       return res.status(400).json({ msg: "Signatures do not match" });
//     }
//   } catch (error) {
//     console.error("Error processing webhook:", error);
//     return res.status(500).json({ msg: "An error occurred while processing the webhook" });
//   }
// };

//refundOrder
const refundOrder = async (req, res) => {
  const { paystackTransactionId,amount } = req.body;

  console.log(paystackTransactionId,amount)

  if(!paystackTransactionId || !amount){
    return res.status(400).json({msg:"Inputs cant be empty"})
  };
  if(paystackTransactionId.length !== 10){
    return res.status(400).json({msg:"Ole Barawu!!!"})
  }

  try {
    // a scenerio in which a client gets debited without us getting his order.
    const paystackRefundResponse = await axios.post(
      'https://api.paystack.co/refund',
      { transaction: paystackTransactionId, amount: amount * 100 }, // Paystack expects the amount in kobo
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Paystack Refund Response:", paystackRefundResponse);

    if (paystackRefundResponse.status === 200) {
      res.json({ success: true, msg: 'Refund has been queued for processing' });
    } else {
      res.status(400).json({ success: false, msg: 'Refund failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
    console.log(error);
  }
}


module.exports = { initializePayment, webhook,  };
