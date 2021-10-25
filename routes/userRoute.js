const app = require("express");
const router = app.Router();

const {
  sendOtp,
  verifyOtp,
  logout,
  authenticateUser,
  refresh,
  home,
  addUser,
  addAddress,
  updateProfile,
} = require("../controllers/userController");

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/refresh", refresh);
router.get("/logout", logout);
router.post("/home", authenticateUser, home);
router.post("/adduser", authenticateUser, addUser);
router.post("/addAddress", authenticateUser, addAddress);
router.post("/updateUser", authenticateUser, updateProfile);

module.exports = router;
