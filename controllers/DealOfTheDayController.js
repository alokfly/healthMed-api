const DealOfTheDay = require("../models/DealOfTheDay");
var ObjectId = require("mongodb").ObjectID;

module.exports.addDealOfTheDay = async (req, res) => {
  const { name, price, quantity, discount, discount_price, popular } = req.body;
  console.log(req.body);
  try {
    const addProduct = await DealOfTheDay.create({
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

module.exports.viewDealOfTheDay = async (req, res) => {
  try {
    const data = await DealOfTheDay.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateDealOfTheDay = async (req, res) => {
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
    const response = await DealOfTheDay.findByIdAndUpdate(
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

module.exports.deleteDealOfTheDay = async (req, res) => {
  try {
    const response = await DealOfTheDay.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
