var router = require('express').Router();
var { User } = require('../mongodb/models');
var { saveDocument, getDocList, getOneDoc, createNewDoc } = require('../mongodb/mongoFun');

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

router.get('/editDoc', function (req, res) {
  const docID = req.query.docID;
  getOneDoc(docID, function (doc) {
    res.json({
      success: true,
      doc});
  });
});

router.get('/createNewDoc', function (req, res) {
  console.log("req.user: ", req.user);
  const userID = req.user._id;
  createNewDoc(userID, function(doc){
    res.json({
      success: true,
      doc
    });
  });
});

module.exports = router;
