import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import DocumentEditor from './components/DocumentEditor';
import DocumentPortal from './components/DocumentPortal';
import Login from './components/Login';
import Landing from './components/Landing';
import Register from './components/Register';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// use axios for authenticated requests

// use hash router

// https://github.com/gsmith98/Quonvo

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      };
  };

  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Route exact={true} path="/" component={Landing} />
          <Route path="/editDoc/:docID" component={DocumentEditor} />
          <Route path="/DocumentPortal" component={DocumentPortal} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/createNewDoc" component={DocumentEditor} />
        </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
   document.getElementById('root'));
