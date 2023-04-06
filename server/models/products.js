const mongoose = require(`mongoose`);

let productsPhotoSchema = new mongoose.Schema({
  filename: { type: String },
});

let productsSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    price: {
      type: Number,
      required: true,
      min: 0.1,
    },
    description: { type: String, required: true },
    categories: [{ type: String, required: true }],
    stock: { type: Number, required: true, min: 0 },
    colours: [{ type: String, required: true }],
    photos: [productsPhotoSchema],
  },
  {
    collection: `products`,
  }
);

module.exports = mongoose.model(`products`, productsSchema);
