const { model, Schema } = require("mongoose");
const topCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    categoryImage: { type: String },
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = model("TopCategory", topCategorySchema);
