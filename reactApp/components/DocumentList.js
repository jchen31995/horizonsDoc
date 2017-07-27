import React from 'react';
import axios from 'axios';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: []
    };
  };

  componentDidMount() {
    const self = this;
    axios({
      method: 'get',
      url: 'http://localhost:3000/docList'
    }).then(function(response) {
      if(response.data.success){
        self.setState({docList: response.data.docList})
      } else {
        alert("document list cannot be loaded!");
      };
    }).catch(function(e) {
        console.log('ERROR in function componentDidMount: ', e);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.docList.map(doc=><li key={doc._id}>{doc.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default DocumentList;
