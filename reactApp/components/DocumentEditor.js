// npm packages
import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import MyEditor from './MyEditor';

class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      userID: "",
      collaboratorIDs: [],
      rawContent: {}
    };
  };

  createNewDoc() {
    const self = this;
    axios({
      method: 'get',
      url: 'http://localhost:3000/createNewDoc'
    }).then(function(response) {
      if(response.data.success){
        self.loadExistingDoc(response.data.doc._id);
      } else {
        console.log("create new document unsuccessful!");
      };
    }).catch(function(e) {
        console.log('ERROR in function createNewDoc: ', e);
    });
  };

  loadExistingDoc(docID) {
    const self = this;
    axios({
      method: 'get',
      url: 'http://localhost:3000/editDoc',
      params: {docID}
    }).then(function(response) {
      if(response.data.success){
        self.setState(response.data.doc);
      } else {
        alert("unsuccessful");
      };
    }).catch(function(e) {
        console.log('ERROR in function componentDidMount: ', e);
    });
  };


  componentWillMount() {
    const self = this;
    if(this.props.location.pathname.split('/')[1] === 'createNewDoc') {
      self.createNewDoc();
    } else {
      const docID = this.props.location.pathname.split('/')[2];
      self.loadExistingDoc(docID);
    };
  };

  saveDoc(contentState) {
    const newDoc = this.state;
    newDoc.rawContent = convertToRaw(contentState);
    this.setState(newDoc);
    axios({
            method: 'POST',
            url: 'http://localhost:3000/updateDoc',
            data: this.state
    }).then(function(response) {
        console.log("response.data", response.data);
    }).catch(function(e) {
        console.log('ERROR in function saveDoc: ', e);
    });
  };

  render() {
    return (
      <div>
        <h1>This is the text editor</h1>
        <Link to='/DocumentPortal'>Back to Portal</Link>
        <p>Sharable documentID: {this.state._id}</p>
        <p>Collaborators: {this.state.collaboratorIDs.toString()}</p>
        <MyEditor
          rawContent={this.state.rawContent}
          saveDoc={this.saveDoc.bind(this)} />
      </div>
    );
  };
};

export default DocumentEditor;
