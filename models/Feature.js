const { model, Schema } = require("mongoose");
const featureSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    feature: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("feature", featureSchema);
