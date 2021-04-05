import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';

import Header from '../../common/header/Header';

import './Login.css';

const user = { username: 'username', password: 'password' };

const accessToken =
  'IGQVJYSEdzUS1QcnVTSUhFNDZAoT0w4NVkwQ296a1VkU3lWbmVKbHoxNzVobVZAiaGxwYlRRRXVoeFlEd1hUUTZAqWGhaU0ZAScDFwYVdXTmdrY0pwaHp6MGxpeU9hVVBrZAkNFbUtQQkkxbXNUWXB1UUZAoeWZAURHdfYmNBQWdv';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      reqUsername: 'dispNone',
      reqPassword: 'dispNone',
      incorrectUser: 'dispNone',
    };
  }

  loginHandler = () => {
    this.state.username === ''
      ? this.setState({ reqUsername: 'dispBlock' })
      : this.setState({ reqUsername: 'dispNone' });

    this.state.password === ''
      ? this.setState({ reqPassword: 'dispBlock' })
      : this.setState({ reqPassword: 'dispNone' });

    this.state.username !== user.username ||
    this.state.password !== user.password
      ? this.setState({ incorrectUser: 'dispBlock' })
      : this.setState({ incorrectUser: 'dispNone' });

    if (
      this.state.username === user.username &&
      this.state.password === user.password
    ) {
      sessionStorage.setItem('access-token', accessToken);
      this.props.history.push('/home');
    }
  };

  render() {
    return (
      <div className="login">
        <Header header="Image Viewer" />
        <main className="login-box">
          <Card>
            <CardContent className="login-card-box">
              <FormControl>
                <Typography variant="h4">LOGIN</Typography>
              </FormControl>

              <br />

              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <FormHelperText className={this.state.reqUsername}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>

              <br />
              <FormControl>
                <InputLabel htmlFor="password">Password *</InputLabel>
                <Input
                  id="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <FormHelperText className={this.state.reqPassword}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>

              <br />

              <FormHelperText className={this.state.incorrectUser}>
                <span className="red">Incorrect username and/or password</span>
              </FormHelperText>

              <br />

              <FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.loginHandler}>
                  LOGIN
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
}

export default withRouter(Login);
