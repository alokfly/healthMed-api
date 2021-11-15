const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  viewDealOfTheDay,
  addDealOfTheDay,
  updateDealOfTheDay,
  deleteDealOfTheDay,
} = require("../controllers/DealOfTheDayController");

router.post("/addDealOfTheDay", upload.array("myField", 5), addDealOfTheDay);
router.get("/viewDealOfTheDay", viewDealOfTheDay);
router.post(
  "/updateDealOfTheDay/:id",
  upload.array("myField", 5),
  updateDealOfTheDay
);
router.get("/deleteDealOfTheDay/:id", deleteDealOfTheDay);

module.exports = router;
