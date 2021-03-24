const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');

let connection = mongoose.connect('mongodb://localhost:37017/product', {useNewUrlParser: true, useUnifiedTopology: true});

const style = {
  id: Number,
  productId: Number,
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Number
};

const Style = mongoose.model('Style', style);

const stream = fs.createReadStream('../csvFiles/styles.csv', {start: 0, highWaterMark: 64})
  .pipe(parse())


stream.on('data', (chunk) => {

  Style.create({
    id: chunk.id,
    productId: chunk.productId,
    name: chunk.name,
    sale_price: chunk.sale_price,
    original_price: chunk.original_price,
    default_style: chunk.default_style
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