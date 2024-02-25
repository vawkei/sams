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
    },
    timeReceived:{
        type:Date,
        required:[true,"enter time received"]
    },
    dateReceived:{
        type:Date,
        required:[true,"enter date received"]
    }

},{timestamps:true});

module.exports = mongoose.model("webhooks",webhookSchema)