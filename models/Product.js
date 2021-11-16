const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    discount_percentage: {
      type: Number,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_form: {
      type: String,
      required: true,
    },
    popular: {
      type: String,
      required: true,
    },
    productPictures: [{ img: { type: String } }],
  },
  { timestamps: true }
);
module.exports = model("Product", productSchema);
