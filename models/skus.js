const mongoose = require('mongoose');

const sku = {
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
};

module.exports = Sku = mongoose.model('Sku', sku);