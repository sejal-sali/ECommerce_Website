const cartsModel = require("../models/cart");

exports.getCartItem = (req, res) => {
  cartsModel.findOne(
    { productId: req.params.productid, userId: req.params.userid },
    (error, data) => {
      res.json(data);
    }
  );
};

exports.getUserCart = (req, res) => {
  cartsModel.find({ userId: req.params.userid }, (error, data) => {
    res.json(data);
  });
};

exports.addToCart = (req, res) => {
  cartsModel.create(req.body, (error, data) => {
    res.json(data);
  });
};

exports.increaseQuantity = (req, res) => {
  cartsModel.findByIdAndUpdate(
    req.params.id,
    { $inc: { quantity: 1 } },
    (error, data) => {
      res.json(data);
    }
  );
};

exports.decreaseQuantity = (req, res) => {
  cartsModel.findByIdAndUpdate(
    req.params.id,
    { $inc: { quantity: -1 } },
    (error, data) => {
      res.json(data);
    }
  );
};

exports.deleteItem = (req, res) => {
  cartsModel.findByIdAndDelete(req.params.id, (error, data) => {
    res.json(data);
  });
};
