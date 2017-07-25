"use strict";

// setup mongoose
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
console.log("----------------------------------------- this should log before mongoose.connect is run");
mongoose.connect(process.env.MONGODB_URI);

// mongodb schema
var userSchema = mongoose.Schema('User', {
	name: String,
	password: String
});

var documentSchema = mongoose.Schema('Document', {
	title: String,
	userID: String,
	collaboratorIDs: Array,
	rawContent: Object
});

// mongodb models
var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

export { User, Document };
