import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

class CreateDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <div style={{margin:'10px'}}>
        <RaisedButton
          backgroundColor={
            colors.white
          }
          label="Create New Document"
          icon={<FontIcon className="material-icons">add</FontIcon>}
        />
      </div>
    );
  }
}

export default CreateDoc;
