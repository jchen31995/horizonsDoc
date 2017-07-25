const express = require('express')
const app = express()

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { saveDocument } = require('../models/mongoFun');

// routes
app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/updateDoc', function (req, res) {
  const doc = req.body;
  saveDocument(doc, function (response) {
    res.json(response);
  });
});

app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
});
