const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');
const transform = require('stream-transform');

let connection = mongoose.connect('mongodb://localhost:37017/product', {useNewUrlParser: true, useUnifiedTopology: true});

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

const Product = mongoose.model('Product', product);

const stream = fs.createReadStream('../csvFiles/product.csv', {start: 0, highWaterMark: 64})
  .pipe(parse())

stream.on('data', (chunk) => {
  Product.create({
  id: chunk.id,
  name: chunk[' name'],
  slogan: chunk[' slogan'],
  description: chunk[' description'],
  category: chunk[' category'],
  default_price: chunk[' default_price'],
  features: [],
  photos: [],
  skus: []
  }, (err, prod) => {
    if (err) {
      console.log(err);
    } else {
      // on data chunk
    }
  });
})
  .on('end', () => {
    console.log('saved');
  })

