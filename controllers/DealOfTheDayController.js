const DealOfTheDay = require("../models/DealOfTheDay");

module.exports.viewDealOfTheDay = async (req, res) => {
  try {
    const data = await DealOfTheDay.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
