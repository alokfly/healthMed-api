const HealthCareProduct = require("../models/HealthCareProduct");
var ObjectId = require("mongodb").ObjectID;

module.exports.addHealthCareProduct = async (req, res) => {
  const { name, price, quantity, discount, discount_price, popular } = req.body;
  console.log(req.body);
  try {
    const addProduct = await HealthCareProduct.create({
      name,
      price,
      quantity,
      discount,
      discount_price,
      popular,
      productPictures: req.files,
    });
    res.status(200).json({ msg: "Product successfully added" });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.vieHealthCareProduct = async (req, res) => {
  const getProduct = await HealthCareProduct.find();

  return res.status(201).json({ data: getProduct });
};

module.exports.updateHealthCareProduct = async (req, res) => {
  let {
    name,
    price,
    quantity,
    discount,
    discount_price,
    popular,
    currentImage,
  } = req.body;
  let profile = req.files ? req.files.filename : currentImage;
  try {
    const response = await HealthCareProduct.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        name,
        price,
        quantity,
        discount,
        discount_price,
        popular,
        productPictures: profile,
      }
    );
    res.status(200).send({ msg: "product successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteHealthCareProduct = async (req, res) => {
  try {
    const response = await HealthCareProduct.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
