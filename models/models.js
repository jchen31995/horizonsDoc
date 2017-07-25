"use strict";

// setup mongoose
const mongoose  = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// mongodb schema
var userSchema = mongoose.Schema({
	name: String,
	password: String
});

var documentSchema = mongoose.Schema({
	title: String,
	userID: String,
	collaboratorIDs: Array,
	rawContent: Object
});

// mongodb models
var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = { User, Document };
