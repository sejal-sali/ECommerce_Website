const ordersModel = require("../models/orders");
const productsModel = require("../models/products");
const cartsModel = require("../models/cart");

exports.createOrder = (req, res, next) => {
  let orderDetails = new Object();

  orderDetails.paypalPaymentId = req.body.paymentId;
  orderDetails.userId = req.body.userId;
  orderDetails.amount = req.body.amount;
  orderDetails.shippingCost = req.body.shippingCost;
  orderDetails.products = [];

  req.body.products.map((item, index) => {
    orderDetails.products[index] = {
      productId: item.productId,
      quantity: item.quantity,
    };

    productsModel.findByIdAndUpdate(
      item.productId,
      { $inc: { stock: -item.quantity } },
      { new: true },
      (err, data) => {
        if (data.stock === 0) {
          cartsModel.deleteMany(
            { productId: item.productId },
            (err, data) => {}
          );
        }
      }
    );
  });

  orderDetails.date = req.body.date;

  cartsModel.deleteMany({ userId: req.body.userId }, (err, data) => {});

  ordersModel.create(orderDetails, (err, data) => {});
};

exports.getAllOrders = (req, res) => {
  ordersModel.find((error, data) => {
    res.json(data);
  });
};

exports.getUserOrders = (req, res, next) => {
  ordersModel.find({ userId: req.params.userId }, (err, data) => {
    res.json(data);
  });
};

exports.getOneOrder = (req, res, next) => {
  ordersModel.findById(req.params.id, (err, data) => {
    res.json(data);
  });
};

exports.getOrderProduct = (req, res, next) => {
  ordersModel.find(
    { products: { $elemMatch: { _id: req.params.id } } },
    (err, data) => res.json(data)
  );
};
