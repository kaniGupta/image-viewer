import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Avatar, Menu, MenuItem } from '@material-ui/core';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = () => {
    this.handleClose();
    this.props.history.push('/profile');
  };

  handleLogout = () => {
    this.handleClose();
    sessionStorage.removeItem('access-token');
    this.props.history.push('/');
  };

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
            <Avatar
              className="header-avatar"
              aria-label="recipe"
              src={this.props.profilePicture}
              onClick={this.handleClick}
            />
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}>
              <MenuItem onClick={this.handleProfile}>My Account</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </header>
    );
  }
}

export default withRouter(Header);
