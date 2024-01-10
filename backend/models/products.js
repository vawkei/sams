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
      default: 0,
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
        type:Object,
        // required:[true,"Please add an image"]
    },
    productViews:{
      viewCount:{
        type:Number,
        default:0
      }
    },
    // sku:{
    //   type:String,
    //   trim:true,
    //   required:[true,"Please add an stock keeping unit"]
    // },
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