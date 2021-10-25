const HealthCareProduct = require("../models/HealthCareProduct");

module.exports.vieHealthCareProduct = async (req, res) => {
  const getProduct = await HealthCareProduct.find();

  return res.status(201).json({ data: getProduct });
};
