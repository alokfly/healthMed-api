const Order = require("../models/Order");
const User = require("../models/User");
const Address = require("../models/Address");
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

module.exports.addOrder = (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const getAddress = await Address.findOne({ user: _id });

      const response = Order.create({
        user: getUser._id,
        addressId: getAddress._id,
        totalAmount: req.body.totalAmount,
        items: req.body.items,
        paymentStatus: req.body.paymentStatus,
        paymentType: req.body.paymentType,
        orderStatus: req.body.orderStatus,
      });

      return res.status(201).json({ response });
    });
  }
};

module.exports.previouslyBoughtItem = async = (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });

      try {
        const getPreviousItem = await Order.findOne({ user: getUser._id });
        console.log(getPreviousItem);
        res.status(201).json({ data: getPreviousItem });
      } catch (error) {
        res.status(400).json(error);
      }
    });
  }
};

module.exports.recentlyOrdertItem = async = (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });

      try {
        const getPreviousItem = await Order.findOne({ user: getUser._id });
        console.log(getPreviousItem);
        res.status(201).json({ data: getPreviousItem });
      } catch (error) {
        res.status(400).json(error);
      }
    });
  }
};

module.exports.viewActiveOrders = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const getProduct = await Order.find(_id, {
        orderStatus: {
          $elemMatch: {
            isCompleted: false,
          },
        },
      });
      res.status(200).json({ response: getProduct });
    });
  }
};

module.exports.trackOrders = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const getProduct = await Order.find(_id, {
        orderStatus: {
          $elemMatch: {
            type: 1,
          },
        },
      });
      res.status(200).json({ response: getProduct });
    });
  }
};
