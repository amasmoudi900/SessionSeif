// import mongoose module
const mongoose = require("mongoose");

// Create Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  avatar: String,
  tel: String,
  role: String,
});

// Create Model Name
const user = mongoose.model("User", userSchema);

// make user exportable
module.exports = user;
