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


const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoutes"); 

app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin:["http://localhost:3001","https://shopito.com"],
    credentials:true
}));



//Routes:
app.get("/",(req,res)=>{
    res.send("<h1>We live Baby</h1>")
});
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/products",productRoute);
app.use("/api/v1/categories",categoryRoute)

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