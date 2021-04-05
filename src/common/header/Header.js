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
    const avatar = (
      <React.Fragment>
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
          {this.props.searchBox ? (
            <MenuItem onClick={this.handleProfile}>My Account</MenuItem>
          ) : null}
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
    return (
      <header className="header">
        <div className="logo">
          <p>{this.props.header}</p>
        </div>
        {this.props.profileBox && avatar}
        {this.props.searchBox && (
          <div className="search-box">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              onChange={this.props.searchBoxHandler}
            />
            {avatar}
          </div>
        )}
      </header>
    );
  }
}

export default withRouter(Header);
