const https = require("https");

const axios = require("axios");

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

//payWithPaystackWebhook===========================================================:
const crypto = require("crypto");

// const webhook = (req, res) => {
//   const hash = crypto
//     .createHmac("sha512", process.env.PAYSTACK_TEST_SECRET_KEY)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//   // Log the calculated hash and the received signature
//   console.log(`Calculated Hash: ${hash}`);

//   if (hash === req.headers["x-paystack-signature"]) {
//     //retrieve the request's body:
//     // Convert the request's body to a JavaScript object:
//     const event = JSON.parse(req.body.toString());
//     console.log("Received Paystack Webhook Event:", event);

//     //do something with event:
//     if (event && event.event === "transfer.success") {
//       // Handle transfer success event
//       console.log("Transfer successful:", event);
//       return res.status(200).json({ message: "Transfer successful" });
//     } else {
//       // Invalid signature
//       console.error("Invalid Paystack signature");
//       return res.status(400).json({ message: "Invalid Paystack signature" });
//     }
//   }
//   res.status(200).json({ message: "Webhook received successfully" });
//   //   res.send("payWithPaystackWebhook route");
// };
const webhook = (req, res) => {
  try {
     // Get the raw body as a string
     const rawBody = req.body.toString();
     console.log(rawBody);
 
     // Create the hash using the raw body
     const hash = crypto
       .createHmac('sha512', process.env.PAYSTACK_TEST_SECRET_KEY)
       .update(rawBody)
       .digest('hex');
 
     // Log the calculated hash and the received signature
     console.log(`Calculated Hash: ${hash}`);
     console.log(`Received Signature: ${req.headers['x-paystack-signature']}`);
 
     if (hash === req.headers['x-paystack-signature']) {
       // Retrieve the request's body:
       const event = JSON.parse(rawBody);
       console.log("Received Paystack Webhook Event:", event);
 
       // Do something with the event:
       if (event && event.event === "transfer.success") {
         // Handle transfer success event
         console.log("Transfer successful:", event);
         return res.status(200).json({ message: "Transfer successful" });
       } else {
         // Invalid signature
         console.error("Invalid Paystack signature");
         return res.status(400).json({ message: "Invalid Paystack signature" });
       }
     } else {
       // Signatures do not match
       console.error("Signatures do not match");
       return res.status(400).json({ message: "Signatures do not match" });
     }
  } catch (error) {
     // An error occurred during the processing of the webhook
     console.error("Error processing webhook:", error);
     return res.status(500).json({ message: "An error occurred while processing the webhook" });
  }
 };
 
 

module.exports = { initializePayment, webhook };

// {
//   status: true,
//   message: 'Authorization URL created',
//   data: {
//     authorization_url: 'https://checkout.paystack.com/xty488alpg8fxb9',
//     access_code: 'xty488alpg8fxb9',
//     reference: 'cvwkbpk49o'
//   }
// }

// {
//   status: true,
//   message: 'Verification successful',
//   data: {
//     id: 3511487442,
//     domain: 'test',
//     status: 'abandoned',
//     reference: 'cvwkbpk49o',
//     gateway_response: 'The transaction was not completed',
//     // ... other details
//   }
// }




