const app = require("express");
const router = app.Router();

const {
  addOrder,
  previouslyBoughtItem,
  recentlyOrdertItem,
  viewActiveOrders,
  trackOrders,
  updateOrderAdmin,
  getCustomerOrdersAdmin,
} = require("../controllers/OrderController");
const { authenticateUser } = require("../controllers/userController");

router.post("/addOrder", authenticateUser, addOrder);
router.post("/getPreviouslyBoughtItem", authenticateUser, previouslyBoughtItem);
router.post("/recentlyOrdertItem", authenticateUser, recentlyOrdertItem);
router.get("/viewActiveOrders", authenticateUser, viewActiveOrders);
router.get("/trackOrders", authenticateUser, trackOrders);

router.post("/updateOrderAdmin", updateOrderAdmin);
router.get("/getCustomerOrdersAdmin", getCustomerOrdersAdmin);

module.exports = router;
