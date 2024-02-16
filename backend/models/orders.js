const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:[true,'enter user'],
        ref:"user"
    },
    firstName:{
        type:String,
        trim:true,
        required:[true,"Please enter name"]
    },
    surname:{
        type:String,
        trim:true,
        required:[true,"Please enter your surname"]
    },
    residentialAddress:{
        type:String,
        trim:true,
        required:[true,"Please enter your address"]
    },
    town:{
        type:String,
        trim:true,
        required:[true,"Please enter your town"]
    },
    state:{
        type:String,
        trim:true,
        required:[true,"Please enter your town"]
    },
    cartItems:{
        type:[Object],
        required:[true,"enter cart details"]
    },
    orderDate:{
        type:Date,
        required:[true,"enter date ordered"]
    },
    orderTime:{
        // type:Date,
        type:String,
        required:[true,"enter time ordered"]
    },
    coupon:{
        // type:Object,
        // default:{name:"null"}
        type:String,
        default: "null",
    },
    orderStatus:{
        type:String,
        required:[true,"State order status"]
    },
    orderAmount:{
        type:Number,
        required:[true,"State order amount"]
    },
    cartTotalQty:{
        type:Number,
        required:[true,"State cart total qty"]
    },
    email:{
        type:String,
        required:[true,"enter email"]
    },
    paymentMethod:{
        type:String,
        required:[true,"payment method?"]
    },
    paystackWebhook:{
        type:[Object],
    }
},{timestamps:true});

module.exports = mongoose.model("orders",orderSchema)