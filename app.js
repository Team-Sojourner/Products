const express = require('express');
const path = require('path');
const password = require('./config.js');
const axios = require('axios');
// const db = require('./db.js');
const example = require('./example.js');
const cleaningFuncs = require('./csvCleaner.js');

console.log(cleaningFuncs.cleaner);

const port = 3000;

// mongo import

const app = express();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));



app.get('/', (req, res) => {
  res.send('working as intended');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
