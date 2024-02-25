const mongoose = require("mongoose");

const webhookSchema = mongoose.Schema({
    event:{
        type:[Object],
        required:[true,"Webhook needed"]
    },

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"orders",
        required:[true,"Please provide user"]
    }
},{timestamps:true});

module.exports = mongoose.model("webhooks",webhookSchema)