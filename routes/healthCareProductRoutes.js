const app = require("express");
const router = app.Router();

const {
  vieHealthCareProduct,
} = require("../controllers/HealthCareProductController");

router.get("/viewHealthCareProduct", vieHealthCareProduct);

module.exports = router;
