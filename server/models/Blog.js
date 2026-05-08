const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: String,
  excerpt: String,
  content: String,
});

module.exports = mongoose.model("Blog", BlogSchema);