import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="logo">{this.props.header}</div>
      </header>
    );
  }
}

export default Header;
