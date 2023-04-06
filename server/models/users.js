const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    accessLevel: {
      type: Number,
    },
    profilePhoto: { type: String, default: "" },
  },
  {
    collection: `users`,
  }
);
module.exports = mongoose.model(`users`, userSchema);
