module.exports = app.get('/products', (req, res) => {

  Product.find({}, {limit: 5}, (err, docs) => {
    if (err) {
      res.sendStatus(500).send('err');
    } else {
      res.sendStatus(200).send('working as intended');
    }
  })
  // check the page params default 1 (integer)
  // check the count params defualt 5 (integer)
})