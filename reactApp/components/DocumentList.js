import React from 'react';
import axios from 'axios';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: []
    };
  };

  componentWillMount() {
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
  };

  docClick(docID) {
    this.props.navigateToEditor(docID);
  };

  render() {
    return (
      <div>
        <List>
          {this.state.docList.map(
            doc=>
              <ListItem
                onTouchTap={this.docClick.bind(this, doc._id)}
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                // rightIcon={<ActionInfo />}
                primaryText={doc.title}
                secondaryText={"Shareable ID: "+doc._id}
                key={doc._id}
              />
          )}
        </List>
      </div>
    );
  }
}

export default DocumentList;
