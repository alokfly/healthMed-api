const TopCategory = require("../models/TopCategory");

module.exports.viewTopCategory = async (req, res) => {
  try {
    const data = await TopCategory.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
