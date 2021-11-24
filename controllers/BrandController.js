const Brand = require("../models/Brand");
const ObjectId = require("mongodb").ObjectID;

module.exports.addBrand = async (req, res) => {
  const brandImage = req.file ? req.file.filename : null;
  const { name, featured_brand } = req.body;
  try {
    const data = await Brand.create({
      name,
      featured_brand,
      image: brandImage,
    });
    res.status(200).json({ msg: "Brand successfully added", data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewBrand = async (req, res) => {
  try {
    const data = await Brand.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.editBrand = async (req, res) => {
  const { name, featured_brand, currentImage } = req.body;
  const brandImage = req.file ? req.file.filename : currentImage;
  try {
    const editBanner = await Brand.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        name,
        featured_brand,
        image: brandImage,
      }
    );
    res.status(200).json({ msg: "Brand successfully edited" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBrand = async (req, res) => {
  try {
    const response = await Brand.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Brand deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewFeaturedBran = async (req, res) => {
  try {
    const viewProduct = await Brand.find({ featured_brand: "yes" });
    return res.status(201).json(viewProduct);
  } catch (error) {
    console.log(error);
  }
};
