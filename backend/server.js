require("dotenv").config();
require("express-async-errors");

const http = require("http");
const socketIo = require("socket.io");

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Initialize Socket.IO
const httpServer = http.createServer(app);

const corsOptions = {
 origin: ["http://localhost:3001", "https://samsapp.onrender.com"],
  // origin: ["http://localhost:3001", "www.samsapp.live"],need 2 create dns
  // methods: ["GET", "POST"],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization","my-custom-header"],
  credentials: true,
};
const io = socketIo(httpServer, {
  cors: corsOptions,
  // path: "/api/v1/orders/",
  // transports:["websocket"],
  // autoConnect:false,
});

io.on("connection", (socket) => {
  console.log("Socket is active");

  socket.on("newlyCreatedOrder", (data) => {
    console.log('newlyCreatedOrder:', data);
  });
});

module.exports = {io};

//Import and initialize express-session here
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});


app.use(cors(corsOptions)); // Apply CORS middleware

// rest of the packages
// const redirectMiddleware = require("./middlewares/redirect-middleware")
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler-middleware");


// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 30, // Limit each IP to 30 requests per windowMs
//     message: 'Too many requests from this IP, please try again after 15 minutes'
//   })
// );
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// const webhookNamespace = io.of("/api/v1/paystack/webhook");
// app.set('webhookNamespace', webhookNamespace);

const paystackRoute = require("./routes/paystackRoutes");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const couponRoute = require("./routes/couponRoutes");
const orderRoute = require("./routes/orderRoutes");
// const paystackRoute = require("./routes/paystackRoutes"); b4 the socket

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3001", "https://samsapp.onrender.com"],
    credentials: true,
  })
);
// https://api-samsapp.onrender.com   api-samsapp

// webhookNamespace.on("connection", (socket) => {
//   console.log("Client connected to /webhook namespace");
//   socket.on("transactionSuccess", (data) => {
//     console.log('Received "someEvent" in /webhook namespace:', data);
//   });
// });

app.use(cookieParser());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false }, // Set secure to true if you're using HTTPS
  })
);

app.use("/api/v1/paystack", paystackRoute);
//note: we put the paystackRoute above the express.json() cuz we dont want the express.json() applied to it, since we will be using a webhook for the paystackRoute.//

app.use(express.json());

app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Routes:
app.get("/", (req, res) => {
  res.send("<h1>We live Baby</h1>");
});
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/orders", orderRoute);


// Middleware to handle URL redirections
// app.use(redirectMiddleware);
//Middleware to handle URL redirections
app.use(notFoundMiddleware);
// Middleware to handle URL errors
app.use(errorMiddleware);

const port = process.env.PORT || 5001;
//========start with this when the app is still basic without a db==========//

// app.listen(port,"localhost",()=>{
//     console.log("it's on");
//     console.log(`Server listening on port ${port}`);
// });

//=============use this when the app is connected to mongodb=============//

// const start =async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           });
//         app.listen(port,'0.0.0.0',()=>{
//             console.log("it's on");
//             console.log("connected to DB");
//             console.log(`Server listening on port ${port}`)
//         })
//     }catch(error){
//         console.log(error)
//     };
// };

//=======use this when the app is connected to db and a web socket==========//
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    httpServer.listen(port, "0.0.0.0", () => {
      console.log("it's on");
      console.log("connected to DB");
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

//======== This is the one before deployment: Used this in DEVELOPMENT MODE=======//

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
