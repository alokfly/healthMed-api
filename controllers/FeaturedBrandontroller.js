const FeaturedBrand = require("../models/FeatureBrand");

module.exports.viewFeaturedBrand = async (req, res) => {
  try {
    const data = await FeaturedBrand.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
