const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Please add a category"],
    },
    quantity: {
      type: Number,
      required: [true, "Please specify a quantity"],
    },
    sold: {
      type: Number,
      trim:true,
    },
    regularPrice: {
      type: Number,
      trim:true
    },
    price: {
      type: Number,
      required: [true, "Please specify price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please add a description"],
    },
    image:{
        type:[String]
    },
    ratings:{
        type: [Object]
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products",ProductSchema);