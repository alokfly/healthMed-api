const { model, Schema } = require("mongoose");
const needHelpSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("NeedHelp", needHelpSchema);
