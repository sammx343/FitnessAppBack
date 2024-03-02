const mongoose = require("mongoose");

const users = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  role: String,
});

const Users = mongoose.model("Users", users);

module.exports = Users;
