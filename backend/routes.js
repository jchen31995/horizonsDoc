var router = require('express').Router();
var { User } = require('../mongodb/models');
var { saveDocument, getDocList } = require('../mongodb/mongoFun');

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.post('/updateDoc', function (req, res) {
  const doc = req.body;
  saveDocument(doc, function (response) {
    res.json(response);
  });
});

router.get('/docList', function (req, res) {
  getDocList(function (docList) {
    res.json({
      success: true,
      docList});
  });
});

module.exports = router;
