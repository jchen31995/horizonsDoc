// var React = require('react');
// var ReactDOM = require('react-dom');
// var { MyEditor } = require('./MyEditor');
import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './MyEditor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      // document: {
      //   id: "abcdefghijklmnopqrstuvwxyz",
      //   title: "sampleDocument",
      //   userID,
      //   password,
      //   collaborators,
      //
      //   content
      // }
    };
  }
  render() {
    return (
      <div>
        <h2></h2>
        <MuiThemeProvider>
          <MyEditor editorState={this.state.editorState} onChange={this.onChange} />
        </MuiThemeProvider>
      </div>
    );
  }
}


ReactDOM.render(<Board />,
   document.getElementById('root'));
