import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './login/Login';

class Controller extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Login />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
