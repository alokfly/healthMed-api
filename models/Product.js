const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    itemCategory: {
      type: String,
      required: true,
    },
    pack_size: {
      type: String,
      required: true,
    },
    country_origin: {
      type: String,
      required: true,
    },
    disclaimer: {
      type: String,
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
    },
    manufacturer_name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount_price: {
      type: String,
      required: true,
    },
    productForm: {
      type: String,
      required: true,
    },
    productPictures: [{ img: { type: String } }],
  },
  { timestamps: true }
);
module.exports = model("Product", productSchema);
