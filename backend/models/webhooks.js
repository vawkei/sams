const mongoose = require("mongoose");

const webhookSchema = mongoose.Schema(
  {
    event: {
      type: [Object],
      required: [true, "Webhook needed"],
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please insert name"],
    },
    email: {
      type: String,
      required: [true, "enter email"],
    },
    cartItems: {
      type: [Object],
    },
    dateReceived: {
      type: Date,
      required: [true, "enter date received"],
    },
    createdBy: {
      type: String,
      trim: true,
      required: [true, "Please insert _id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("webhooks", webhookSchema);
