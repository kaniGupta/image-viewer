import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './login/Login';
import Home from './home/Home';

class Controller extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            {sessionStorage.getItem('access-token') == null ? (
              <Route exact path="/" render={() => <Login />} />
            ) : null}
            <Route exact path="/home" render={() => <Home />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
