const mongoose = require("mongoose");

const businesses = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  description: String,
  userId: String,
});

const Businesses = mongoose.model("Businesses", businesses);

module.exports = Businesses;
