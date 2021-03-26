const mongoose = require('mongoose');

const style = {
  id: Number,
  productId: Number,
  name: String,
  sale_price: mongoose.Mixed,
  original_price: Number,
  default_style: Number
};

module.exports = Style = mongoose.model('Style', style);