import React from 'react';
import CreateDoc from './CreateDoc';
import DocumentList from './DocumentList';
import AddSharedDoc from './AddSharedDoc';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class DocumentPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentList: ["title1", "sampleDocument"]
    };
  };

  clickLogOut(e) {
    e.preventDefault();
    const self = this;
    axios({
      method: 'get',
      url: 'http://localhost:3000/logout'
    }).then(function(response) {
      if(response.data.success){
        alert("Logout successful!")
        self.props.history.push('/Login');
      } else {
        alert("Logout unsuccessful!");
      };
    }).catch(function(e) {
        console.log('ERROR in function clickLogOut: ', e);
    });
  };

  navigateToEditor(docID) {
    this.props.history.push('/editDoc/' + docID);
  }

  navigateToNewDoc() {
    this.props.history.push('/createNewDoc');
  }

  render() {
    return (
      <div>
        <h2>Documents Portal</h2>
        <CreateDoc navigateToNewDoc={this.navigateToNewDoc.bind(this)} />
        <DocumentList navigateToEditor={this.navigateToEditor.bind(this)} />
        <AddSharedDoc />
        <RaisedButton
          style={{marginTop: '30px'}}
          onClick={this.clickLogOut.bind(this)}
          label="Logout"
          secondary={true}
        />
      </div>
    );
  }
}

export default DocumentPortal;
