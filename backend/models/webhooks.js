const mongoose = require("mongoose");

const webhookSchema = mongoose.Schema({
    event:{
        type:[Object],
        required:[true,"Webhook needed"]
    },
    firstName:{
        type:String,

    },
    surname:{
        type:String
    },
    createdBy:{
        type:String
    },
    cartItems:{
        type:[Object]
    }

    // createdBy:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"user",
    //    // required:[true,"Please provide user"]
    // }
},{timestamps:true});

module.exports = mongoose.model("webhooks",webhookSchema)