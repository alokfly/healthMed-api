const momgoose = require("mongoose");
require("dotenv").config();
module.exports = connect = async () => {
  try {
    const response = await momgoose.connect(process.env.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connection created");
  } catch (error) {
    console.log(error);
  }
};
