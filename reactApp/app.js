var React = require('react');
var ReactDOM = require('react-dom');
var { MyEditor } = require('./MyEditor');
// require('draft-js/dist/Draft.css');

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
        password: "123",
        collaborators: ["user1", "user2"],
        content: {}
      }
    };
  }
  render() {
    return (
      <div>
        <h2></h2>
        <MyEditor />
      </div>
    );
  }
}


ReactDOM.render(<Board />,
   document.getElementById('root'));
