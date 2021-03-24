const mongoose = require('mongoose');
const parse = require('csv-parser');
const fs = require('fs');

var thumbStorage, urlStorage;

let connection = mongoose.connect('mongodb://localhost:37017/product', {useNewUrlParser: true, useUnifiedTopology: true});

const photo = {
  styleId: Number,
  id: Number,
  photos: Object
};

const Photo = mongoose.model('Photo', photo);

const stream = fs.createReadStream('../csvFiles/transformedPhotos.csv', {start: 0, highWaterMark: 64})
  .pipe(parse())


stream.on('data', (chunk) => {

  console.log(chunk)

  Photo.create({
    id: chunk.id,
    styleId: chunk[' styleId'],
    photos: {
      thumbnail_url: chunk[' thumbnail_url'],
      url: chunk[' url']
    }
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
