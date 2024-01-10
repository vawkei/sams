const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please insert a coupon name"],
      unique: true,
      uppercase: true,
      minlength: [5, "Name shouldn't be less than 5 characters"],
      maxlength: [18, "Name shouldn't be more than 18 characters"],
    },
    discount: {
      type: Number,
      required: [true, "Please insert a discount"],
    },
    expiryDate: {
      type: Date,
      required: [true,"Please insert a date"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", couponSchema);
