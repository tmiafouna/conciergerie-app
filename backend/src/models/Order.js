const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["hotel", "roomservice"], default: "roomservice" },
    items: [
      {
        name: { type: String },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    // Hotel booking fields
    roomId: { type: String },
    roomName: { type: String },
    bookingDate: { type: String },
    bookingEndDate: { type: String },
    bookingType: { type: String, enum: ["hour", "night"] },
    startTime: { type: String },
    endTime: { type: String },
    duration: { type: Number },
    // Room service fields
    roomNumber: { type: String },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
