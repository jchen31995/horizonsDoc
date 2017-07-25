"use strict";

// setup mongoose
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// mongodb models
import { User, Document } from './models'

// mongodb functions
const saveRawContent = (documentID, rawContent) => {
  Document.findByIdAndUpdate(documentID, { $set: { rawContent }}).exec()
  .catch((e)=>{
    console.log("ERROR in function saveRawContent:", e);
  });
};

export { saveRawContent }
