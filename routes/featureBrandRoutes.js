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
  viewFeaturedBrand,
  addFeatureBrand,
  updateFeatureBrand,
  deleteFeatureBrand,
} = require("../controllers/FeaturedBrandontroller");

router.post("/addFeatureBrand", upload.single("myField"), addFeatureBrand);
router.get("/viewFeaturedBrand", viewFeaturedBrand);
router.post(
  "/updateFeatureBrand/:id",
  upload.single("myField"),
  updateFeatureBrand
);
router.get("/deleteFeatureBrand/:id", deleteFeatureBrand);

module.exports = router;
