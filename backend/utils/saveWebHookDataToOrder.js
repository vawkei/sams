


const saveWebhookDataToOrder = () => {
  // Store the webhook data in the variable

  return webhookData;
};

module.exports = {
  saveWebhookDataToOrder,
};



// // webhookUtils.js

// const saveWebhookData = (data) => {
//     // Your logic to save the webhook data, e.g., store it in a variable
//     return data;
//   };
  
//   module.exports = {
//     saveWebhookData,
//   };

//   // webhookController.js
// const { saveWebhookData } = require('./webhookUtils');

// const webhook = async (req, res) => {
//   try {
//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK_TEST_SECRET_KEY)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     if (hash === req.headers["x-paystack-signature"]) {
//       const event = req.body;

//       if (event && event.event === "charge.success") {
//         const savedData = saveWebhookData(event.data);
//         // Continue processing the webhook data or emit events as needed
//         // ...
//       }
//     }

//     // ... (rest of the code)
//   } catch (error) {
//     console.error("Error processing webhook:", error);
//     return res
//       .status(500)
//       .json({ msg: "An error occurred while processing the webhook" });
//   }
// };

// module.exports = {
//   webhook,
// };


// // createOrderController.js
// const { saveWebhookData } = require('./webhookUtils');

// const createOrder = async (incomingOrder) => {
//   try {
//     // Your order creation logic
//     const newOrder = new Order({
//       // ... populate other fields of the order
//     });

//     // Set paystackWebhook based on the latest Paystack webhook data
//     newOrder.paystackWebhook = saveWebhookData(event.data); // Assuming event.data is accessible here

//     // Save the order to the database
//     await newOrder.save();

//     // ... (rest of the code)
//   } catch (error) {
//     console.error("Error creating order:", error);
//     // Handle errors as needed
//   }
// };

// module.exports = {
//   createOrder,
// };
