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
  viewHandPickedItem,
  addHandPickedItem,
  updateHandPickedItem,
  deleteHandPickedItem,
} = require("../controllers/HandPickedController");

router.post(
  "/addHandPickedItem",
  upload.array("myField", 5),
  addHandPickedItem
);
router.get("/viewHandPickedItem", viewHandPickedItem);
router.post(
  "/updateHandPickedItem/:id",
  upload.single("myField"),
  updateHandPickedItem
);
router.get("/deleteHandPickedItem/:id", deleteHandPickedItem);

module.exports = router;
