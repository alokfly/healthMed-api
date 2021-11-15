const FeaturedBrand = require("../models/FeatureBrand");
const ObjectId = require("mongodb").ObjectID;

module.exports.addFeatureBrand = async (req, res) => {
  const profile = req.file ? req.file.filename : null;
  const { brandName, category } = req.body;
  try {
    const addProduct = await FeaturedBrand.create({
      brandName,
      category,
      bannerImage: profile,
    });
    res.status(200).json({ msg: "Feature Brand successfully added" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.viewFeaturedBrand = async (req, res) => {
  try {
    const data = await FeaturedBrand.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateFeatureBrand = async (req, res) => {
  let { brandName, category, currentImage } = req.body;
  let profile = req.file ? req.file.filename : currentImage;
  try {
    const response = await FeaturedBrand.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        brandName,
        category,
        bannerImage: profile,
      }
    );
    return res.status(200).json({ msg: "Featured Brand has been updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports.deleteFeatureBrand = async (req, res) => {
  try {
    const response = await FeaturedBrand.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Featured Brand deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
