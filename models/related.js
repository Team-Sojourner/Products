const mongoose = require('mongoose');

const product = {
  id: mongoose.Mixed,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: Array,
  photos: Array,
  skus: Array
};

module.exports = Product = mongoose.model('Product', product);