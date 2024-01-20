const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter a name"],
      minlength:[3,"Name length shouldn't be < 3"],
      maxlength:[10,"Name length shouldn't be  > 10"]
    },
    surname:{
      type:String,
      trim:true,
      minlength:[4,"surname length shouldn't be < 4"],
      maxlength:[15,"surname length shouldn't be  > 15"]
    },
    email: {
      type: String,
      trim: true,
      required: [true],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter password"],
      minlength: [6, "Password characters should be more than 6"],
    },
    passwordToken:{
      type:String
    },
    passwordTokenExpirationDate:{
      type:Date
    },
    role: {
      type: String,
      required:[true,"Please specify your role"],
      enum: ["customer", "admin"],
      default: "customer",
    },
    verificationToken:{
      type:String
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    verifiedDate:{
      type:Date
    },
    phone: {
      type: String,
      required: [true, "Please enter your number"],
      default: "+234",
    },
    address: {
      type: String,
      trim: true,
    },
    town:{
      type:String,
      trim:true,
      minlength:[3,"Name length shouldn't be < 3"],
      maxlength:[10,"Name length shouldn't be  > 10"]
    },
    state:{
      type:String,
      trim:true,
      minlength:[3,"Name length shouldn't be < 3"],
      maxlength:[10,"Name length shouldn't be  > 10"]
    },
    photo: {
      type: String,
      required: [true, "Please add your photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    cartItems:{
      type:[Object]
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("user",userSchema);