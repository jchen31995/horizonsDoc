import React from 'react';
import CreateDoc from './CreateDoc';
import DocumentList from './DocumentList';
import AddSharedDoc from './AddSharedDoc';

class DocumentPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentList: ["title1", "sampleDocument"]
    };
  };

  render() {
    return (
      <div>
        <h2>Documents Portal</h2>
        <CreateDoc />
        <DocumentList />
        <AddSharedDoc />
      </div>
    );
  }
}

export default DocumentPortal;
