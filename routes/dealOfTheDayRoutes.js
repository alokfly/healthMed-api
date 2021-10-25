const app = require("express");
const router = app.Router();

const { viewDealOfTheDay } = require("../controllers/DealOfTheDayController");

router.get("/viewDealOfTheDay", viewDealOfTheDay);

module.exports = router;
