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
  vieHealthCareProduct,
  addHealthCareProduct,
  updateHealthCareProduct,
  deleteHealthCareProduct,
} = require("../controllers/HealthCareProductController");

router.post(
  "/addHealthCareProduct",
  upload.array("myField", 5),
  addHealthCareProduct
);
router.get("/viewHealthCareProduct", vieHealthCareProduct);
router.post(
  "/updateHealthCareProduct/:id",
  upload.array("myField", 5),
  updateHealthCareProduct
);

router.get("/deleteHealthCareProduct/:id", deleteHealthCareProduct);

module.exports = router;
