const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const HandPickedProduct = require("../models/HandPickProduct");
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
var ObjectId = require("mongodb").ObjectID;

module.exports.searchProduct = async (req, res) => {
  var regex = new RegExp(req.params.name, "i");
  Product.find({ name: regex }).then((result) => {
    res.status(200).json(result);
  });
};

module.exports.searchLowPriceProduct = async (req, res) => {
  try {
    const data = await Product.find({}).sort({ price: 1 });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchHighPriceProduct = async (req, res) => {
  try {
    const data = await Product.find({}).sort({ price: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchDiscountProduct = async (req, res) => {
  try {
    const data = await Product.find({ discount: "yes" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchPopularProduct = async (req, res) => {
  try {
    const data = await Product.find({ popular: "yes" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewHandPickedProduct = async (req, res) => {
  try {
    const data = await HandPickedProduct.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.filterProduct = async (req, res) => {
  try {
    const response = await Product.find(req.query);
    console.log(response);
    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewProductAfterPayment = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const getProduct = await Order.find({
        user: _id,
        paymentStatus: "completed",
      });
      res.status(200).json({ response: getProduct });
    });
  }
};

module.exports.addProduct = async (req, res) => {
  let profile = req.files;
  try {
    const {
      description,
      title,
      category,
      itemCategory,
      pack_size,
      country_origin,
      disclaimer,
      brand_name,
      manufacturer_name,
      price,
      discount_price,
      productForm,
    } = req.body;

    const pricePercent = ((price - discount_price) * 100) / price;
    const discountPer = Math.round(pricePercent);
    const create = await Product.create({
      description,
      title,
      category,
      itemCategory,
      pack_size,
      country_origin,
      disclaimer,
      brand_name,
      manufacturer_name,
      price,
      discount_price,
      discount_percentage: discountPer,
      productForm,
      productPictures: profile,
    });

    res.status(201).json({ msg: " product sccessfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
    const getProduct = await Product.find();
    res.status(200).json({ data: getProduct });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editProduct = async (req, res) => {
  let profile = req.files;
  try {
    const {
      description,
      title,
      category,
      itemCategory,
      pack_size,
      country_origin,
      disclaimer,
      brand_name,
      manufacturer_name,
      price,
      discount_price,
      productForm,
    } = req.body;

    const pricePercent = ((price - discount_price) * 100) / price;
    const discountPer = Math.round(pricePercent);

    const create = await Product.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        description,
        title,
        category,
        itemCategory,
        pack_size,
        country_origin,
        disclaimer,
        brand_name,
        manufacturer_name,
        price,
        discount_price,
        discount_percentage: discountPer,
        productForm,
        productPictures: profile,
      }
    );
    res.status(201).json({ msg: " product sccessfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const response = await Product.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
