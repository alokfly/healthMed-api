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
  addBrand,
  viewBrand,
  editBrand,
  deleteBrand,
} = require("../controllers/BrandController");

router.post("/addBrand", upload.single("myField"), addBrand);
router.get("/viewBrand", viewBrand);
router.post("/editBrand/:id", upload.single("myField"), editBrand);
router.get("/deleteBrand/:id", deleteBrand);

module.exports = router;
