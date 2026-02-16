const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema({
  user: String,
  pose: String,
  time: Number,
  accuracy: Number,
  date: String
});

module.exports = mongoose.model("Performance", PerformanceSchema);
