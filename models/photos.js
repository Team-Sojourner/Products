const mongoose = require('mongoose');

const photo = {
  styleId: Number,
  id: Number,
  photos: Object
};

module.exports = Photo = mongoose.model('Photo', photo);