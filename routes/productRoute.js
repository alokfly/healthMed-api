const app = require("express");
const router = app.Router();

const {
  searchProduct,
  searchLowPriceProduct,
  searchHighPriceProduct,
  getAllProduct,
  searchDiscountProduct,
  searchPopularProduct,
  viewHandPickedProduct,
  viewProductAfterPayment,
  filterProduct,
  addProduct,
} = require("../controllers/productController");
const { authenticateUser } = require("../controllers/userController");

router.get("/search-product/:name", searchProduct);
router.get("/searchLowPriceProduct", searchLowPriceProduct);
router.get("/searchHighPriceProduct", searchHighPriceProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/searchDiscountProduct", searchDiscountProduct);
router.get("/searchPopularProduct", searchPopularProduct);
router.get("/viewHandPickedProduct", viewHandPickedProduct);
router.get("/filterProduct", filterProduct);
router.get(
  "/viewProductAfterPayment",
  authenticateUser,
  viewProductAfterPayment
);
router.post("/addProduct", addProduct);

module.exports = router;
