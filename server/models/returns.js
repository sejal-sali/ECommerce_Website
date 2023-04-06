const mongoose = require(`mongoose`);

let returnSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    products: [{ type: String, required: true }],
    amount: { type: Number, required: true },
    date: { type: Date },
  },
  {
    collection: `returns`,
  }
);

module.exports = mongoose.model(`returns`, returnSchema);
