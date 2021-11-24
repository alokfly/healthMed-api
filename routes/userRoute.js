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
  getAddress,
  editAddress,
  removeAddress,
} = require("../controllers/userController");

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/refresh", refresh);
router.get("/logout", logout);
router.post("/home", authenticateUser, home);
router.post("/adduser", authenticateUser, addUser);
router.post("/addAddress", authenticateUser, addAddress);
router.get("/getAddress", authenticateUser, getAddress);
router.post("/editAddress/:id", authenticateUser, editAddress);
router.get("/removeAddress/:id", authenticateUser, removeAddress);
router.post("/updateUser", authenticateUser, updateProfile);

module.exports = router;
