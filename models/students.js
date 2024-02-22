const mongoose = require("mongoose");

const students = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  cellphone: Number,
});

const Students = mongoose.model("Students", students);

module.exports = Students;
