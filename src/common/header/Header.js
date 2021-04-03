import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="header">{this.props.header}</div>;
  }
}

export default Header;
