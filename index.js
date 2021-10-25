const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const router = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoutes");
const prescriptionRoute = require("./routes/prescriptionRoutes");
const healthCareProductRoute = require("./routes/healthCareProductRoutes");
const featureBrandRoute = require("./routes/featureBrandRoutes");
const dealOfTheDayRoute = require("./routes/dealOfTheDayRoutes");
const topCategoryRoute = require("./routes/topCategoryRoutes");
const needHelpRoute = require("./routes/needHelpRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(cookieParser());

connect();
app.use(bodyParser.json());
app.use("/", router);
app.use("/", productRoute);
app.use("/", cartRoute);
app.use("/", orderRoute);
app.use("/", prescriptionRoute);
app.use("/", healthCareProductRoute);
app.use("/", featureBrandRoute);
app.use("/", dealOfTheDayRoute);
app.use("/", topCategoryRoute);
app.use("/", needHelpRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Your app is running");
});
