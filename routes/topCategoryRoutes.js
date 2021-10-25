const app = require("express");
const router = app.Router();

const { viewTopCategory } = require("../controllers/CategoryController");

router.get("/viewTopCategory", viewTopCategory);

module.exports = router;
