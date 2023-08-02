// import mongoose module
const mongoose = require("mongoose");

// Create Schema
const matchSchema = mongoose.Schema({
  scoreOne: Number,
  scoreTwo: Number,
  teamOne: String,
  teamTwo: String,
});

// Create Model Name
const match = mongoose.model("Match", matchSchema);

// make match exportable
module.exports = match;
