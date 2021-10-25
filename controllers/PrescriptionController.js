const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const Prescription = require("../models/Prescription");
const User = require("../models/User");
const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

module.exports.addPrescription = (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });

      const form = formidable({ multiples: true });
      form.parse(req, async (error, fields, files) => {
        const errors = [];
        if (Object.keys(files).length === 0) {
          errors.push({ msg: "Image is required" });
        } else {
          const { type } = files.image;
          const split = type.split("/");
          const extension = split[1].toLowerCase();
          if (
            extension !== "jpg" &&
            extension !== "jpeg" &&
            extension !== "png"
          ) {
            errors.push({ msg: `${extension} is not a valid extension` });
          } else {
            files.image.name = uuidv4() + "." + extension;
          }
        }
        if (errors.length !== 0) {
          return res.status(400).json({ errors, files });
        } else {
          const newPath = __dirname + `/../images/${files.image.name}`;
          fs.copyFile(files.image.path, newPath, async (error) => {
            if (!error) {
              try {
                const response = await Prescription.create({
                  user: getUser._id,
                  full_name: getUser.full_name,
                  email: getUser.email,
                  phone: getUser.phone,
                  image: files.image.name,
                });
                return res.status(200).json({
                  msg: "Prescription is successfully submited",
                  response,
                });
              } catch (error) {
                return res
                  .status(500)
                  .json({ errors: error, msg: error.message });
              }
            }
          });
        }
      });
    });
  }
};
