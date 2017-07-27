import React from 'react';
import { Link } from 'react-router-dom';

require('../styles/draft.css');


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <div>
        <div className="landingTitle">Welcome to Horizons Docs</div>
        <ul>
          <li><Link to='/Login'>Login</Link></li>
          <li><Link to='/Register'>Register</Link></li>
        </ul>
      </div>
    );
  }
}

export default Landing;
