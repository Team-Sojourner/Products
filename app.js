const express = require('express');
const path = require('path');
const password = require('./config.js');
const axios = require('axios');
const mongoose = require('mongoose');
const models = require('./models/models');
const { MongoClient } = require('mongodb');
// const routes = require('./Routes/Router.js');

const app = express();
const port = 3001;

const url = "mongodb://localhost:37017/product";




app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

let connection = mongoose.connect('mongodb://localhost:37017/product', {useNewUrlParser: true, useUnifiedTopology: true});


const Product = models.Product;
const Feature = models.Features;
const Photo = models.Photo;
const Sku = models.Sku;
const Style = models.Style;

var query;

app.get('/products', (req, res) => {

  Product.find({})
    .select('-features -photos -skus')
    .limit(5)
    .then((docs) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(docs);
    })
  .catch((err) => {
    res.sendStatus(500).send(err);
  })
  // check the page params default 1 (integer)
  // check the count params defualt 5 (integer)
});

app.get('/products/:product_id', async (req, res) => {

  Feature.find({ id: req.params.product_id})
  .then( async (data) => {
    await Product.findOne({id: req.params.product_id})
    .select('-features -photos -skus')
    .then((data2) => {
      data2.features = data[0].features;
      res.header('Access-Control-Allow-Origin', '*');
      res.json(data2);
    })
  })
  .catch((error) => {
    res.sendStatus(500).send(error);
  })
});







app.get('/products/:product_id/styles', (req, res) => {

  // let productnum = Math.ceil(Math.random() * 1000);

    req.app.locals.db.collection('styles').aggregate([
      { $match: { productId: Number(req.params.product_id)}},
      {
        $lookup:
          {
            from: "photos",
            localField: "id",
            foreignField: "styleId",
            as: "photos"
          }
      },
      {
        $lookup:
          {
            from: "skus",
            localField: "id",
            foreignField: "styleId",
            as: "skus"
          }
      }
    ])
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      } else {
        let formatResults = {
          product_id: req.params.product_id,
          results: []
        }
        result.forEach((style) => {
          let styleObj = {
            style_id: style.id,
            name: style.name,
            original_price: style.original_price,
            'default?': style.default_style === 0,
            sale_price: style.sale_price,
            photos:[],
            skus: {}
          }
          formatResults.results.push(styleObj);
          style.photos.forEach((photo) => {
            let photoObj = {
              thumbnail_url: photo.photos.thumbnail_url,
              url: photo.photos.url,
            }
            styleObj.photos.push(photoObj);
          })
          style.skus.forEach((sku) => {
            styleObj.skus[sku.id] = {
              quantity: sku.quantity,
              size: sku.size
            }
          })
        })
        res.header('Access-Control-Allow-Origin', '*');
        res.json(formatResults);
      }
    })
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);

  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
        return console.log(err);
    }
    app.locals.db = client.db('product');
    // Specify database you want to access

    console.log(`MongoDB Connected: ${url}`);
  });
})





