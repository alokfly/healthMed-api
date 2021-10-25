const app = require("express");
const router = app.Router();

const { viewFeaturedBrand } = require("../controllers/FeaturedBrandontroller");

router.get("/viewFeaturedBrand", viewFeaturedBrand);

module.exports = router;
