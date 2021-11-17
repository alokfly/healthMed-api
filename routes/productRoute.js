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
  searchProduct,
  searchLowPriceProduct,
  searchHighPriceProduct,
  searchDiscountProduct,
  searchPopularProduct,
  viewHandPickedProduct,
  viewProductAfterPayment,
  filterProduct,
  addProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authenticateUser } = require("../controllers/userController");

router.get("/search-product/:name", searchProduct);
router.get("/searchLowPriceProduct", searchLowPriceProduct);
router.get("/searchHighPriceProduct", searchHighPriceProduct);
router.get("/searchDiscountProduct", searchDiscountProduct);
router.get("/searchPopularProduct", searchPopularProduct);
router.get("/viewHandPickedProduct", viewHandPickedProduct);
router.get("/filterProduct", filterProduct);
router.get(
  "/viewProductAfterPayment",
  authenticateUser,
  viewProductAfterPayment
);
router.post("/addProduct", upload.array("myField", 5), addProduct);
router.get("/getAllProduct", getAllProduct);
router.post("/editProduct/:id", upload.array("myField", 5), editProduct);
router.get("/deleteProduct/:id", deleteProduct);

module.exports = router;
