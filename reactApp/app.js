// var React = require('react');
// var ReactDOM = require('react-dom');
// var { MyEditor } = require('./MyEditor');
import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './MyEditor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { saveRawContent } from '../models/mongoFun'

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
        _id: "abcdefghijklmnopqrstuvwxyz",
        title: "sampleDocument",
        userID: "abcdefghijklmnopqrstuvwxyz",
        collaboratorIDs: ["ID1", "ID2"],
        rawContent: ""
      }
    };
  }

  saveDoc(editorState){
    const rawContent = convertToRaw(editorState.getCurrentContent());
    this.setState({rawContent: rawContent});
    saveRawContent(this.state.document._id, this.state.document.rawContent);
  }


  render() {
    return (
      <div>
        <h2>{this.state.document.title}</h2>
        <p>Collabortors: {this.state.document.collaborators.toString()}</p>
        <MyEditor saveDoc={this.saveDoc.bind(this)} />
      </div>
    );
  }
}


ReactDOM.render(<Board />,
   document.getElementById('root'));
