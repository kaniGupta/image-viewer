import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './login/Login';
import Home from './home/Home';
import Profile from './profile/Profile';

class Controller extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route path="/home" render={() => <Home />} />
            <Route path="/profile" render={() => <Profile />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
