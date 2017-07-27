import React from 'react';

// formsy form
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';


class AddSharedDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };


  submitForm(docID) {
    const self = this;
    axios({
      method: 'post',
      url: 'http://localhost:3000/AddSharedDoc',
      data: docID
    }).then(function(response) {
      if(response.data.success){
        // self.props.history.push('/DocumentPortal');
        alert("success!")
      } else {
        alert("unsuccessful! response: ", response);
      };
    }).catch(function(e) {
        console.log('ERROR in function submitForm: ', e);
    });
  };

  notifyFormError(data) {
    alert('Form error:', data);
  };

  render() {
    return (
      <Paper style={{
              width: 300,
              padding: 20,
              paddingTop: 0
            }}>
        <Formsy.Form
          onSubmit={this.submitForm.bind(this)}
        >
          <FormsyText
            name="docID"
            required
            hintText="shareable ID"
            floatingLabelText="Add Shared Document"
          />
          <RaisedButton
            primary={true}
            type="submit"
            label="Add"
          />
        </Formsy.Form>
      </Paper>
    );
  }
}

export default AddSharedDoc;
