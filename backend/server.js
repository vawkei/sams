require("dotenv").config();
require("express-async-errors");



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require ("express-fileupload");
const cloudinary = require("cloudinary").v2;

const errorMiddleware = require("./middlewares/error-handler-middleware");

const cors = require("cors");
const cookieParser = require("cookie-parser");




app.use(express.json());
app.use(cookieParser())
app.use(fileUpload({useTempFiles:true}))
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

//userRoutes:
const register = require("./routes/userRoutes");
const login = require("./routes/userRoutes");
const logout = require("./routes/userRoutes");
//const getAllUsers = require("./routes/userRoutes");
const getSingleUser = require("./routes/userRoutes");
const updateUser = require("./routes/userRoutes");
const getLoginStatus = require("./routes/userRoutes");
const uploadUserPhoto = require("./routes/userRoutes");
const updateUserPhoto = require("./routes/userRoutes");

// productRoutes:
const getProducts = require("./routes/productRoutes");
const getSingleProduct = require("./routes/productRoutes");
const createProduct = require("./routes/productRoutes");
const updateProduct = require("./routes/productRoutes");
const deleteProduct = require("./routes/productRoutes");
const review = require("./routes/productRoutes");
const deleteProductReview = require("./routes/productRoutes")


app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin:["http://localhost:3001","https://shopito.com"],
    credentials:true
}));



//homeRoute:
app.get("/",(req,res)=>{
    res.send("<h1>We live Baby</h1>")
});
//userRoutes:
app.use("/api/v1/auth",register);

app.use("/api/v1/auth",login);

app.use("/api/v1/auth",logout);

//app.use("/api/v1/auth",getAllUsers);

app.use("/api/v1/auth",getSingleUser);

app.use("/api/v1/auth",updateUser);

app.use("/api/v1/auth",getLoginStatus);

app.use("/api/v1/auth",uploadUserPhoto);

app.use("/api/v1/auth",updateUserPhoto);


//productRoutes:
app.use("/api/v1/products",getProducts);

app.use("/api/v1/products",getSingleProduct);

app.use("/api/v1/products",createProduct);

app.use("/api/v1/products",updateProduct);

app.use("/api/v1/products",deleteProduct);

app.use("/api/v1/products",review);

app.use("/api/v1/products",deleteProductReview);

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