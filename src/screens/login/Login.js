import React, { Component } from 'react';

import Header from '../../common/header/Header';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header header="Image Viewer" />
      </div>
    );
  }
}

export default Login;
