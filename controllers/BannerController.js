const Banner = require("../models/Banner");

module.exports.addBanner = async (req, res) => {
  const banner = req.files;

  try {
    const addImage = banner.forEach(async (element) => {
      const addBanner = await Banner.create({
        bannerImage: element.filename,
      });

      res.status(201).json({ msg: "Banner successfully added" });
    });
  } catch (error) {
    console.log(error);
  }
};
