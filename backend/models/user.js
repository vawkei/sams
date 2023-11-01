const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter a name"],
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
    role: {
      type: String,
      required:[true,"Please specify your role"],
      enum: ["customer", "admin"],
      default: "customer",
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
    photo: {
      type: String,
      required: [true, "Please add your photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("user",userSchema);