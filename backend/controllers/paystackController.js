const https = require("https");

//payWithPaystack:

// const payStack = {
//   //acceptPament controller:
//   acceptPayment: async (req, res) => {
//     try {
//       //request body from the client:
//       const email = req.body.email;
//       const amount = req.body.amount;
//       //params:
//       const params = JSON.stringify({
//         email: email,
//         amount: amount * 100,
//       });
//       //options:
//       const options = {
//         hostname: "api.paystack.co",
//         port: 443,
//         path: "/transaction/initialize",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`, //secret key from the dashboard
//           "Content-Type": "application/json",
//         },
//       };
//       //client request to paystack API:
//       const clientReq = https
//         .request(options, (apiRes) => {
//           let data = "";
//           apiRes.on("data", (chunk) => {
//             data += chunk;
//           });
//           apiRes.on("end", () => {
//             // console.log(JSON.parse(data));
//             // return res.status(200).json(data);
//             const paystackResponse = JSON.parse(data);
//             //console.log(paystackResponse);
//             const authorizationUrl = paystackResponse.data.authorization_url;
//             res.json({ authorizationUrl });
//           });
//         })
//         .on("error", (error) => {
//           console.error(error);
//         });
//       clientReq.write(params);
//       clientReq.end();
//     } catch (error) {
//       //handle any error that occurs during the request:
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },

//   //VerifyPayment controller:
//   verifyPayment: async (req, res) => {
//     const reference = req.params.reference;
//     try {
//       const options = {
//         hostname: "api.paystack.co",
//         port: 443,
//         path: `/transaction/verify/${reference}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
//         },
//       };
//       const apiReq = https.request(options, (apiRes) => {
//         let data = "";

//         apiRes.on("data", (chunk) => {
//           data += chunk;
//         });

//         apiRes.on("end", () => {
//           // console.log(JSON.parse(data));
//           // return res.status(200).json(data);
//           const paystackResponse = JSON.parse(data);
//           const reference = paystackResponse.reference;
//           console.log(reference)
//           res.status(200).json({ reference });

//         });
//       });

//       apiReq.on("error", (error) => {
//         console.error(error);
//         res.status(500).json(error);
//       });
//       //End the request:
//       apiReq.end();
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },

//   //chargeCard controller:
//   chargeCard: async (req, res) => {
//     try {
//       let { email, amount, authorization_code } = req.body;
//       const params = JSON.stringify({
//         email: email,
//         amount: amount * 100,
//         authorization_code: authorization_code,
//       });

//       const options = {
//         hostname: "api.paystack.co",
//         port: 443,
//         path: "/transaction/charge_authorization",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       };
//       const request = https
//         .request(options, (apiRes) => {
//           let data = "";

//           apiRes.on("data", (chunk) => {
//             data += chunk;
//           });
//           apiRes.on("end", () => {
//             console.log(JSON.parse(data));
//             res.status(200).json(JSON.parse(data));
//           });
//         })
//         .on("error", (error) => {
//           console.error(error.message);
//           res.status(500).json(error.message);
//         });

//       request.write(params);
//       request.end();
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },
// };

// const initializePayment = payStack;

// //payWithPaystackWebhook:
// const crypto = require("crypto");

// const webhook = (req, res) => {
//   const hash = crypto
//     .createHmac("sha512", process.env.SECRET_KEY)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//     if(hash ==req.headers["x-paystack-signature"]){
//         //retrieve the request's body:
//         const event = req.body;
//         //do something with event:
//         if(event && event.event ==="transfer.success"){
//             return res.status(200).json({message:"Transfer successful"})
//         }
//     }
//     res.status(200)
// //   res.send("payWithPaystackWebhook route");
// };

// module.exports = { initializePayment, webhook };

//====================================================================================
//got this from chatgpt:

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
      console.log("AcceptPayment respnse:",paystackResponse);

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
    console.log("Received referenceBackend:",referenceFrmDBackend)
   
    const {reference} = req.body
    console.log("Received reference:", reference)
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
      console.log("verify response:",verifyResponse);
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

const webhook = (req, res) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_TEST_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    //retrieve the request's body:
    const event = req.body;
    console.log("Received Paystack Webhook Event:", event);

    //do something with event:
    if (event && event.event === "transfer.success") {
      // Handle transfer success event
      console.log("Transfer successful:", event);
      return res.status(200).json({ message: "Transfer successful" });
    } else {
      // Invalid signature
      console.error("Invalid Paystack signature");
      return res.status(400).json({ message: "Invalid Paystack signature" });
    }
  }
  res.status(200).json({ message: "Webhook received successfully" });
  //   res.send("payWithPaystackWebhook route");
};

module.exports = { initializePayment, webhook };

//1 Webhooks:

// The webhook route in your backend should be well-protected and handle Paystack webhook events securely. Currently, you are using the x-paystack-signature header for verification. Make sure to validate and verify the received webhook events to ensure their authenticity.

// 2
// For proper payment verification, it seems you're already using the Paystack /transaction/verify endpoint, which is the correct approach. Ensure that you handle the response appropriately and update the order status accordingly.

//3
// https://checkout.paystack.com/5cwa73g2ozwnhir
// however, i get this in the console: api-samsapp.onrender.com/api/v1/paystack/verifypayment/undefined:1

// Failed to load resource: the server responded with a status of 500 ()
// paystackIndex.js:101 AxiosError: Request failed with status code 500.
// thats after concluding the payments
