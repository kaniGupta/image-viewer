import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/">{this.props.header}</Link>
        </div>
      </header>
    );
  }
}

export default Header;
