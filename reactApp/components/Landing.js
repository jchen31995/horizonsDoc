import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <div>
        <h2>Landing Page for Horizons Docs</h2>
        <ul>
          <li><Link to='/Login'>Login</Link></li>
          <li><Link to='/Register'>Register</Link></li>
        </ul>
      </div>
    );
  }
}

export default Landing;
