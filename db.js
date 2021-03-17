const CouchDB = require('node-couchdb');


module.exports =  couch = new CouchDB({
  auth: {
    user: 'admin',
    password: password
  }
})