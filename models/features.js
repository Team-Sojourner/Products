const mongoose = require('mongoose');

const feature = {
  id: mongoose.Mixed,
  features: Array
};

module.exports = Feature = mongoose.model('Feature', feature);