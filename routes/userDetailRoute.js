const app = require("express");
const router = app.Router();

const {
  addUserDetail,
  userValiations,
  addAddress,
} = require("../controllers/userDetailController");

router.post("/addUserDetail", userValiations, addUserDetail);
router.post("/addAddress", addAddress);

module.exports = router;
