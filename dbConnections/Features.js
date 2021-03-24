const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');

let connection = mongoose.connect('mongodb://localhost:37017/product', {useNewUrlParser: true, useUnifiedTopology: true});

const feature = {
  id: mongoose.Mixed,
  features: Array
};

const Feature = mongoose.model('Feature', feature);

const stream = fs.createReadStream('../csvFiles/features.csv', {start: 0, highWaterMark: 64})
  .pipe(parse())

var currentFeature = 0;
var features = [];

stream.on('data', (chunk) => {

  if (chunk.productId === currentFeature) {
    features.push({
      feature: chunk.feature,
      value: chunk.value
    })
  } else {
    Feature.create({
    id: currentFeature,
    features: features,
    }, (err, prod) => {
      if (err) {
        console.log(err);
      } else {
        // on data chunk
      }
    });
    currentFeature = chunk.productId;
    features = [];
    features.push({
      feature: chunk.feature,
      value: chunk.value
    })
  }

})
  .on('end', () => {
    console.log('saved');
  })