const { model, Schema } = require("mongoose");
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    featured_brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("brand", brandSchema);
