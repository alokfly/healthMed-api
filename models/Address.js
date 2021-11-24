const { model, Schema } = require("mongoose");
const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    deliver_to: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    house_number: {
      type: String,
      required: true,
    },
    street_name: {
      type: String,
      required: true,
    },
    address_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("address", addressSchema);
