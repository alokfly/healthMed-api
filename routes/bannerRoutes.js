const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "banner" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addBanner,
  getBanner,
  editBanner,
  deleteBanner,
} = require("../controllers/BannerController");

router.post("/addBanner", upload.array("myField", 5), addBanner);
router.get("/getBanner", getBanner);
router.post("/editBanner/:id", upload.single("myField"), editBanner);
router.get("/deleteBanner/:id", deleteBanner);

module.exports = router;
