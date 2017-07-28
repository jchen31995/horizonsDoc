var router = require('express').Router();
var { User } = require('../mongodb/models');
var { saveDocument, getDocList, getOneDoc, createNewDoc } = require('../mongodb/mongoFun');

var { convertToRaw, EditorState } = require('draft-js');


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
  const userID = req.user._id;
  const emptyRawContent = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
  createNewDoc(userID, emptyRawContent, function(doc){
    res.json({
      success: true,
      doc
    });
  });
});

module.exports = router;
