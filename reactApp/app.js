// var React = require('react');
// var ReactDOM = require('react-dom');
// var { MyEditor } = require('./MyEditor');
import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './MyEditor';
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
        id: "abcdefghijklmnopqrstuvwxyz",
        title: "sampleDocument"
      }
    };
  }
  render() {
    return (
      <div>
        <h1>This is the text editor</h1>
        <MyEditor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}


ReactDOM.render(<Board />,
   document.getElementById('root'));
