require("dotenv").config();
require("express-async-errors");


const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const fileUpload = require ("express-fileupload");
const cloudinary = require("cloudinary").v2;

// rest of the packages

const errorMiddleware = require("./middlewares/error-handler-middleware");

const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoutes"); 
const couponRoute = require("./routes/couponRoutes");
const orderRoute = require("./routes/orderRoutes");
const paystackRoute = require("./routes/paystackRoutes");

app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin:["http://localhost:3001","https://samsapp.com"],
    credentials:true
}));


app.use(cookieParser())


const session = require("express-session")
app.use(session({
 secret: process.env.PAYSTACK_TEST_SECRET_KEY,
 resave: false,
 saveUninitialized: true,
 cookie: { secure: false } // Set secure to true if you're using HTTPS
}));

app.use("/api/v1/paystack",paystackRoute);
//note: we put the paystackRoute above the express.json() cuz we dont want the express.json() applied to it, since we will be using a webhook for the paystackRoute.
             

app.use(express.json());

app.use(fileUpload({useTempFiles:true}))
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


//Routes:
app.get("/",(req,res)=>{
    res.send("<h1>We live Baby</h1>")
});
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/products",productRoute);
app.use("/api/v1/categories",categoryRoute);
app.use("/api/v1/coupons",couponRoute);
app.use("/api/v1/orders",orderRoute);

app.use(errorMiddleware);


const port = process.env.PORT || 5001;
// app.listen(port,"localhost",()=>{
//     console.log("it's on");
//     console.log(`Server listening on port ${port}`);
// });

const start =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port,"localhost",()=>{
            console.log("it's on");
            console.log("connected to DB");
            console.log(`Server listening on port ${port}`)
        })
    }catch(error){
        console.log(error)
    };
};

start();