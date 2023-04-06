const mongoose = require(`mongoose`);

let ordersProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {type: String,
    enum : ['Delivered','Returned'],
    default: 'Delivered'}
});

let orderSchema = new mongoose.Schema(
  {
    paypalPaymentId: { type: String, required: true },
    userId: { type: String },
    amount: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    products: [ordersProductSchema],
    date: { type: Date },
  },
  {
    collection: `orders`,
  }
);

module.exports = mongoose.model(`orders`, orderSchema);
