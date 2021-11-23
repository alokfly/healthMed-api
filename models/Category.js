const { model, Schema } = require("mongoose");
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    top_categories: {
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
module.exports = model("Category", CategorySchema);
