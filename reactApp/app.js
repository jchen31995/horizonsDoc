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
    this.state = {};
  }
  render() {
    return (
      <div>
        <p> test test </p>
        <MyEditor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}


ReactDOM.render(<Board />,
   document.getElementById('root'));
