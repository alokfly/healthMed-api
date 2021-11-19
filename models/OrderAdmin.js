const { model, Schema } = require("mongoose");
const orderAdminSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "ordered",
    },
  },
  { timestamps: true }
);
module.exports = model("orderAdmin", orderAdminSchema);
