"use strict";

// setup mongoose
const mongoose  = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// mongodb models
const { User, Document } = require('./models');

// mongodb functions
const saveDocument = function(doc, callback) {
  Document.findOne({title: doc.title}).exec()
  .then(function(mongoDoc) {
    if(!mongoDoc){
      const newDoc = new Document({
        title: doc.title,
      	userID: doc.userID,
      	collaboratorIDs: doc.collaboratorIDs,
      	rawContent: doc.rawContent
      });
      return newDoc.save();
    } else {
      return Document.findOneAndUpdate({title: doc.title}, {rawContent: doc.rawContent}).exec()
    };
  })
  .then(function(mongoDoc) {
    callback(mongoDoc);
  })
  .catch(function(e) {
    console.log("ERROR in function saveRawContent:", e);
  });
};

const getDocList = function(callback){
  Document.find().exec()
  .then(function(docList){
    callback(docList);
  })
  .catch(function(e) {
    console.log("ERROR in function getDocList:", e);
  });
}

const getOneDoc = function(docID, callback){
  Document.findById(docID).exec()
  .then(function(doc){
    callback(doc);
  })
  .catch(function(e) {
    console.log("ERROR in function getOneDoc:", e);
  });
}

const createNewDoc = function(userID, callback){
  const newDoc = new Document({
    title: "new document #" + Math.floor(Math.random()*1000),
    userID: userID,
    collaboratorIDs: [],
    rawContent: {}
  });
  newDoc.save()
  .then(function(doc){
    callback(doc);
  })
  .catch(function(e) {
    console.log("ERROR in function createNewDoc:", e);
  });
}

module.exports = {
  saveDocument,
  getDocList,
  getOneDoc,
  createNewDoc
 };
