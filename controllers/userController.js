require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const crypto = require("crypto");
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;
const jwt = require("jsonwebtoken");
const {
  AccessTokenInstance,
} = require("twilio/lib/rest/verify/v2/service/accessToken");
const User = require("../models/User");
const Address = require("../models/Address");

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
let refreshTokens = [];
let accessTokens = [];

module.exports.sendOtp = async = (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ttl = 2 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  client.messages
    .create({
      body: `Your One Time Login Password ${otp}`,
      from: +18438251159,
      to: phone,
    })
    .then((messages) => console.log(messages))
    .catch((err) => console.error(err));

  // res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
  res.status(200).send({ phone, hash: fullHash }); // Use this way in Production
};

module.exports.verifyOtp = async = (req, res) => {
  const phone = req.body.phone;
  const hash = req.body.hash;
  const otp = req.body.otp;
  let [hashValue, expires] = hash.split(".");

  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.status(504).send({ msg: "Timeout. Please try again" });
  }
  let data = `${phone}.${otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", smsKey)
    .update(data)
    .digest("hex");
  if (newCalculatedHash === hashValue) {
    console.log("user confirmed");
    const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
      expiresIn: "1y",
    });
    const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, {
      expiresIn: "1y",
    });
    refreshTokens.push(refreshToken);
    accessTokens.push(accessToken);
    res
      .status(202)
      .cookie("accessToken", accessToken, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
        httpOnly: true,
      })
      .cookie("authSession", true, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
      })
      .cookie("refreshTokenID", true, {
        expires: new Date(new Date().getTime() + 31557600000),
        sameSite: "strict",
      })
      .send({ msg: "Login Successfull" });
  } else {
    console.log("not authenticated");
    return res.status(400).send({ verification: false, msg: "Incorrect OTP" });
  }
};

module.exports.home = async = (req, res) => {
  console.log("home private route");
  res.status(202).send("Private Protected Route - Home");
};

module.exports.authenticateUser = async = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
    if (phone) {
      req.phone = phone;
      next();
    } else if (err.message === "TokenExpiredError") {
      return res.status(403).send({
        success: false,
        msg: "Access token expired",
      });
    } else {
      console.log(err);
      return res.status(403).send({ err, msg: "User not authenticated" });
    }
  });
};

module.exports.addUser = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { full_name, email } = req.body;
      try {
        const addUser = await User.create({
          full_name,
          email,
          phone: phone.data,
          status: 1,
        });
        return res.status(200).json({ msg: "Data successfully submitted" });
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
    });
  }
};

module.exports.addAddress = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { address } = req.body;
      try {
        const addUser = await Address.create({
          user: getUser._id,
          full_name: getUser.full_name,
          email: getUser.email,
          phone: getUser.phone,
          address,
        });
        return res.status(200).json({ msg: "address successfully submitted" });
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
    });
  }
};

module.exports.refresh = async = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(403)
      .send({ message: "Refresh token not found, login again" });
  if (!refreshTokens.includes(refreshToken))
    return res
      .status(403)
      .send({ message: "Refresh token blocked, login again" });

  jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
    if (!err) {
      const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
        expiresIn: "30s",
      });
      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: "strict",
          httpOnly: true,
        })
        .cookie("authSession", true, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: "strict",
        })
        .send({ previousSessionExpired: true, success: true });
    } else {
      return res.status(403).send({
        success: false,
        msg: "Invalid refresh token",
      });
    }
  });
};

module.exports.logout = async = (req, res) => {
  res
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .clearCookie("authSession")
    .clearCookie("refreshTokenID")
    .send("logout");
};

module.exports.updateProfile = async = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const { full_name, email } = req.body;
      try {
        const addUser = await User.findByIdAndUpdate(_id, {
          full_name,
          email,
        });
        return res.status(200).json({ msg: "user successfully updated" });
      } catch (error) {
        return res.status(500).json({ errors: error });
      }
    });
  }
};
