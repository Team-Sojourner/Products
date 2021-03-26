const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');

let connection = mongoose.connect('mongodb://localhost:37017/product', {useNewUrlParser: true, useUnifiedTopology: true});

const sku = {
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
};

const Sku = mongoose.model('Sku', sku);

const stream = fs.createReadStream('../csvFiles/skus.csv', {start: 0, highWaterMark: 64})
  .pipe(parse())


stream.on('data', (chunk) => {

  Sku.create({
    id: chunk.id,
    styleId: chunk[' styleId'],
    size: chunk[' size'],
    quantity: chunk[' quantity']
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