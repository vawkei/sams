// require("dotenv").config();
// require("express-async-errors");

// const http = require("http");
// const socketIo = require("socket.io");

// const express = require("express");
// const app = express();

// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");

// const fileUpload = require("express-fileupload");
// const cloudinary = require("cloudinary").v2;

// // Initialize Socket.IO
// const httpServer = http.createServer(app);

// const corsOptions = {
//   origin: ["http://localhost:3001", "https://samsapp.onrender.com"],
//   methods: ["GET", "POST"],
//   allowedHeaders: ["my-custom-header"],
//   credentials: true,
// };
// const io = socketIo(httpServer, {
//   cors: corsOptions,
//   path:"/webhook",
//   // transports:["websocket"],
//   // autoConnect:false,
// });

// // Import and initialize express-session here
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const store = new MongoDBStore({
//   uri: process.env.MONGO_URI,
//   collection: "sessions",
// });

// // rest of the packages

// const errorMiddleware = require("./middlewares/error-handler-middleware");

// const webhookNamespace = io.of("/webhook");

// const paystackRoute = require("./routes/paystackRoutes")(webhookNamespace);
// const userRoute = require("./routes/userRoutes");
// const productRoute = require("./routes/productRoutes");
// const categoryRoute = require("./routes/categoryRoutes");
// const couponRoute = require("./routes/couponRoutes");
// const orderRoute = require("./routes/orderRoutes");
// // const paystackRoute = require("./routes/paystackRoutes"); b4 the socket

// app.use(express.urlencoded({ extended: false }));

// app.use(
//   cors({
//     origin: ["http://localhost:3001", "https://samsapp.onrender.com"],
//     credentials: true,
//   })
// );



// webhookNamespace.on("connection", (socket) => {
//   console.log("Client connected to /webhook namespace");
//   socket.on("transactionSuccess", (data) => {
//     console.log('Received "someEvent" in /webhook namespace:', data);
//   });
// });

// app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.EXPRESS_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: { secure: false }, // Set secure to true if you're using HTTPS
//   })
// );

// app.use("/api/v1/paystack", paystackRoute);
// //note: we put the paystackRoute above the express.json() cuz we dont want the express.json() applied to it, since we will be using a webhook for the paystackRoute.

// app.use(express.json());

// app.use(fileUpload({ useTempFiles: true }));
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// //Routes:
// app.get("/", (req, res) => {
//   res.send("<h1>We live Baby</h1>");
// });
// app.use("/api/v1/auth", userRoute);
// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/categories", categoryRoute);
// app.use("/api/v1/coupons", couponRoute);
// app.use("/api/v1/orders", orderRoute);

// app.use(errorMiddleware);

// const port = process.env.PORT || 5001;
// //========start with this when the app is still basic without a db==========//

// // app.listen(port,"localhost",()=>{
// //     console.log("it's on");
// //     console.log(`Server listening on port ${port}`);
// // });

// //=============use this when the app is connected to mongodb=============//

// // const start =async ()=>{
// //     try{
// //         await mongoose.connect(process.env.MONGO_URI, {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //           });
// //         app.listen(port,'0.0.0.0',()=>{
// //             console.log("it's on");
// //             console.log("connected to DB");
// //             console.log(`Server listening on port ${port}`)
// //         })
// //     }catch(error){
// //         console.log(error)
// //     };
// // };

// //=======use this when the app is connected to db and a web socket==========//
// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     httpServer.listen(port, "0.0.0.0", () => {
//       console.log("it's on");
//       console.log("connected to DB");
//       console.log(`Server listening on port ${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();





//==============================WEBHOOK CONTROLLER=========================
// const webhook = (req, res) => {
  // const webhook = (webhookNamespace) =>async (req, res) => {
  //   try {
  
  //     const hash = crypto
  //       .createHmac("sha512", process.env.PAYSTACK_TEST_SECRET_KEY)
  //       .update(JSON.stringify(req.body)) // Stringify the object to create a hash
  //       .digest("hex");
  
  //     // Log the calculated hash and the received signature
  //     console.log("Calculated Hash:", hash);
  //     console.log("Received Signature:", req.headers["x-paystack-signature"]);
  
  //     if (hash === req.headers["x-paystack-signature"]) {
  //       // Retrieve the request's body:
  //       const event = req.body; // req.body is now a JavaScript object
  //       console.log("Received Paystack Webhook Event:", event);
  
  //       // Do something with the event:
  //       if (event && event.event === "charge.success") {
          
  //         console.log('Emitting transactionSuccess event:', event.data);
          
  //         // Emit the event to all connected clients
  //         console.log(webhookNamespace.emit("transactionSuccess", event.data))
  //         webhookNamespace.emit("transactionSuccess", event.data, (error) => {
  //           if (error) {
  //             console.error("Error emitting transactionSuccess event:", error);
  //           } else {
  //             console.log("transactionSuccess event emitted successfully");
  //           }
  //         });
          
  //         // Handle charge success event
  //         console.log("Charge successful:", event.data);
          
  //         return res.status(200).json({ msg: "Charge successful" });
  //       }  else {
  //         // Invalid event type or other conditions
  //         console.error("Invalid Paystack event or conditions");
  //         return res.status(400).json({ msg: "Invalid Paystack event or conditions" });
  //       }
  //     } else {
  //       // Signatures do not match
  //       console.error("Signatures do not match");
  //       return res.status(400).json({ msg: "Signatures do not match" });
  //     }
  //   } catch (error) {
  //     // An error occurred during the processing of the webhook
  //     console.error("Error processing webhook:", error);
  //     return res
  //       .status(500)
  //       .json({ msg: "An error occurred while processing the webhook" });
  //   }
  // };
  






































//======== This is the one before deployment: Use this in DEVELOPMENT MODE=======//

// require("dotenv").config();
// require("express-async-errors");

// const express = require("express");
// const app = express();

// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");

// const fileUpload = require ("express-fileupload");
// const cloudinary = require("cloudinary").v2;

// // rest of the packages

// const errorMiddleware = require("./middlewares/error-handler-middleware");

// const userRoute = require("./routes/userRoutes");
// const productRoute = require("./routes/productRoutes");
// const categoryRoute = require("./routes/categoryRoutes");
// const couponRoute = require("./routes/couponRoutes");
// const orderRoute = require("./routes/orderRoutes");
// const paystackRoute = require("./routes/paystackRoutes");

// app.use(express.urlencoded({extended:false}));

// app.use(cors({
//     origin:["http://localhost:3001","https://samsapp.onrender.com"],
//     credentials:true
// }));

// app.use(cookieParser())

// const session = require("express-session")
// app.use(session({
//  secret: process.env.PAYSTACK_TEST_SECRET_KEY,
//  resave: false,
//  saveUninitialized: true,
//  cookie: { secure: false } // Set secure to true if you're using HTTPS
// }));

// app.use("/api/v1/paystack",paystackRoute);
// //note: we put the paystackRoute above the express.json() cuz we dont want the express.json() applied to it, since we will be using a webhook for the paystackRoute.

// app.use(express.json());

// app.use(fileUpload({useTempFiles:true}))
// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
// });

// //Routes:
// app.get("/",(req,res)=>{
//     res.send("<h1>We live Baby</h1>")
// });
// app.use("/api/v1/auth",userRoute);
// app.use("/api/v1/products",productRoute);
// app.use("/api/v1/categories",categoryRoute);
// app.use("/api/v1/coupons",couponRoute);
// app.use("/api/v1/orders",orderRoute);

// app.use(errorMiddleware);

// const port = process.env.PORT || 5001;
// // app.listen(port,"localhost",()=>{
// //     console.log("it's on");
// //     console.log(`Server listening on port ${port}`);
// // });

// const start =async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         app.listen(port,"localhost",()=>{
//             console.log("it's on");
//             console.log("connected to DB");
//             console.log(`Server listening on port ${port}`)
//         })
//     }catch(error){
//         console.log(error)
//     };
// };

// start();
