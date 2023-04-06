const ordersModel = require("../models/orders");
const returnsModel = require("../models/returns");
const productsModel = require("../models/products");

exports.returnOrder = (req, res, next) => {
  let returnObj = new Object();

  returnObj.orderId = req.body.orderId;
  returnObj.userId = req.body.userId;
  returnObj.products = [];
  returnObj.date = req.body.date;
  returnObj.amount = req.body.amount;
  req.body.products.map((item, index) => {
    let details = JSON.parse(item);

    returnObj.products[index] = details._id;

    productsModel.findByIdAndUpdate(
      details.productId,
      { $inc: { stock: +details.quantity } },
      { new: true },
      (err, data) => {}
    );

    ordersModel.findOneAndUpdate(
      {
        "products._id": details._id,
      },
      {
        $set: {
          "products.$.status": "Returned",
        },
      },
      (err, data) => {}
    );
  });

  returnsModel.create(returnObj, (err, data) => {});
};

exports.getAllReturns = (req, res) => {
  returnsModel.find((error, data) => {
    res.json(data);
  });
};

exports.getUserReturns = (req, res, next) => {
  returnsModel.find({ userId: req.params.userId }, (err, data) => {
    res.json(data);
  });
};

exports.getOneReturn = (req, res, next) => {
  returnsModel.findById(req.params.id, (err, data) => {
    res.json(data);
  });
};
