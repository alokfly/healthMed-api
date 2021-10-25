const Cart = require("../models/Cart");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

module.exports.addItemToCart = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });

      Cart.findOne({ user: getUser._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          //if cart already exists then update cart by quantity
          let promiseArray = [];

          req.body.cartItems.forEach((cartItem) => {
            const product = cartItem.product;
            const item = cart.cartItems.find((c) => c.product == product);
            let condition, update;
            if (item) {
              condition = { user: getUser._id, "cartItems.product": product };
              update = {
                $set: {
                  "cartItems.$": cartItem,
                },
              };
            } else {
              condition = { user: getUser._id };
              update = {
                $push: {
                  cartItems: cartItem,
                },
              };
            }
            promiseArray.push(runUpdate(condition, update));
          });
          Promise.all(promiseArray)
            .then((response) => res.status(201).json({ response }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          //if cart not exist then create a new cart
          const cart = new Cart({
            user: getUser._id,
            cartItems: req.body.cartItems,
          });

          cart.save((error, cart) => {
            if (error) {
              return res.status(400).json({ error });
            }
            if (cart) {
              return res.status(201).json({ cart });
            }
          });
        }
      });
    });
  }
};

module.exports.getCartItems = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const getCartItems = await Cart.findOne({ user: _id });
      res.status(201).json({ data: getCartItems.cartItems });
    });
  }
};

module.exports.removeCartItem = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { productId } = req.body.payload;
      if (productId) {
        Cart.updateOne(
          { user: getUser._id },
          {
            $pull: {
              cartItems: {
                product: productId,
              },
            },
          }
        ).exec((error, result) => {
          if (error) return res.status(400).json({ error });
          if (result) {
            res.status(202).json({ result });
          }
        });
      }
    });
  }
};
