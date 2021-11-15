const { model, Schema } = require("mongoose");
const dealOfTheDaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    productPictures: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("DealOfTheDay", dealOfTheDaySchema);
