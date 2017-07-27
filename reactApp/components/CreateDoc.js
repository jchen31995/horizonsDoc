import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

import axios from 'axios';

class CreateDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  newDocClick() {
    this.props.navigateToNewDoc();
  };

  render() {
    return (
      <div style={{margin:'10px'}}>
        <RaisedButton
          primary={true}
          backgroundColor={
            colors.white
          }
          label="Create New Document"
          icon={<FontIcon className="material-icons">add</FontIcon>}
          onTouchTap={this.newDocClick.bind(this)}
        />
      </div>
    );
  }
}

export default CreateDoc;
