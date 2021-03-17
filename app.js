const express = require('express');
const path = require('path');
const CouchDB = require('node-couchdb');
const password = require('./config.js');
const axios = require('axios');

const port = 3000;

// move to a seperate db file
const couch = new CouchDB({
  auth: {
    user: 'admin',
    password: password
  }
})

couch.listDatabases()
  .then((dbs) => {
    console.log(dbs);
  })

const app = express();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));



app.get('/', (req, res) => {
  res.send('working as intended');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})