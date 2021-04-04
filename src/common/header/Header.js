import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/">{this.props.header}</Link>
        </div>
        {this.props.searchBox && (
          <div className="search-box">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              onChange={this.props.searchBoxHandler}
            />
          </div>
        )}
      </header>
    );
  }
}

export default Header;
