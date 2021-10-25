const { model, Schema } = require("mongoose");
const handPickProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    discount_price: {
      type: String,
    },
    popular: {
      type: String,
      required: true,
    },
    productPictures: [{ img: { type: String } }],
  },
  { timestamps: true }
);
module.exports = model("HandPickProduct", handPickProductSchema);
