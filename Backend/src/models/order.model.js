import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    contentBooks: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
        quantity: { type: Number, required: true },
      },
    ],
    dateOrder: { type: Date, default: Date.now },
    isShipped: { type: Boolean, default: false },
  },
  { collection: "order" }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
