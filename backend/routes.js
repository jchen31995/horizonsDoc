var router = require('express').Router();
var { User } = require('../models/models');
var { saveDocument } = require('../models/mongoFun');

router.get('/', function (req, res) {
  res.send('Hello World!')
});

router.post('/updateDoc', function (req, res) {
  const doc = req.body;
  saveDocument(doc, function (response) {
    res.json(response);
  });
});

module.exports = router;
