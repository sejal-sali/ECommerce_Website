const mongoose = require(`mongoose`);

let cartSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    quantity: { type: Number, required: true },
    productPrice: { type: Number },
  },
  {
    collection: `cart`,
  }
);

module.exports = mongoose.model(`cart`, cartSchema);
