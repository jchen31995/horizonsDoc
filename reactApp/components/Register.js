// react
import React from 'react';
import { Link, hashHistory } from 'react-router-dom';

// log in form and components
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';

// axios
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    };
  };

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  };

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  };

  submitForm(data) {
    const self = this;
    axios({
      method: 'post',
      url: 'http://localhost:3000/signup',
      data: data
    }).then(function(response) {
      if(response.data.success){
        self.props.history.push('/Login');
      } else {
        alert("Registration unsuccessful! " + response.data.error);
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
      <div>
        <h2>Register</h2>
        <Link to='/'>Back to Home</Link>
        <Paper style={{
                width: 300,
                margin: 'auto',
                padding: 20,
              }}>
          <Formsy.Form
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}
            onValidSubmit={this.submitForm.bind(this)}
            onInvalidSubmit={this.notifyFormError.bind(this)}
          >
            <FormsyText
              name="username"
              required
              hintText="username"
              floatingLabelText="username"
            />
            <FormsyText
              name="password"
              type="password"
              required
              hintText="password"
              floatingLabelText="password"
            />
            <RaisedButton
              style={{marginTop: 32}}
              type="submit"
              label="Register"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </div>
    );
  }
}

export default Register;
