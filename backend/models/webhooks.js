const mongoose = require("mongoose");

const webhookSchema = mongoose.Schema({
    event:{
        type:[Object],
        required:[true,"Webhook needed"]
    },
    firstName:{
        type:String,
        trim:true,
        required:[true,"Please insert name"]
    },
    email:{
        type:String,
        required:[true,"enter email"]
    },
    // createdBy:{
    //     type:String,
    //     trim:true,
    //     required:[true,"Please insert name"]
    // },
    cartItems:{
        type:[Object],
    }

    // createdBy:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"user",
    //    // required:[true,"Please provide user"]
    // }
},{timestamps:true});

module.exports = mongoose.model("webhooks",webhookSchema)