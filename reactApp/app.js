// var React = require('react');
// var ReactDOM = require('react-dom');
// var { MyEditor } = require('./MyEditor');
import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './MyEditor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

// require('draft-js/dist/draft.css');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {
        _id: "5977b384a943ca3e78a7112a",
        title: "sampleDocument",
        userID: "abcdefghijklmnopqrstuvwxyz",
        collaboratorIDs: [],
        rawContent: {}
      }
    };
  };

  saveDoc(contentState){
    const rawContent = convertToRaw(contentState);
    const newDoc = this.state.document;
    newDoc.rawContent = rawContent;
    this.setState({document: newDoc});
    fetch('http://localhost:3000/updateDoc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.document)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
        console.log("save successful! JSON response:", json);
    }).catch(function(e) {
        console.log('ERROR in function saveDoc: ', e);
    });
  };

  render() {
    return (
      <div>
        <h2>{this.state.document.title}</h2>
        <p>Sharable documentID: {this.state.document._id}</p>
        <p>Collaborators: {this.state.document.collaboratorIDs.toString()}</p>
        <MyEditor saveDoc={this.saveDoc.bind(this)} />
      </div>
    );
  }
}


ReactDOM.render(<Board />,
   document.getElementById('root'));
