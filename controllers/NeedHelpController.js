const NeedHelp = require("../models/NeedHelp");

module.exports.viewNeedHelp = async (req, res) => {
  try {
    const data = await NeedHelp.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
