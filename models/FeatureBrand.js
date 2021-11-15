const { model, Schema } = require("mongoose");
const featureBrandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("featureBrandSchema", featureBrandSchema);
