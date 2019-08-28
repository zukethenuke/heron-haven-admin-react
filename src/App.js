import React, {Component} from 'react';
import './App.css';
import AuthenticationService from './services/AuthenticationService';
import MailBox from './components/MailBox';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
    this.login();
  }

  async login() {
    try {
      let response = await AuthenticationService.login({
        // email: this.state.email,
        // password: this.state.password
        email: 'test@test.com',
        password: '12345678'
      });
      let { user, token } = response.data;
      this.setState({
        loggedIn: true,
        user,
        token
      })
    } catch (error) {
      this.setState({
        error: error.response.data.error
      })
    }
  }

  handleUserNameChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlepasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: '' });
    this.login();
  }

  render() {
    return (
      <div className="App-body">
        {!this.state.loggedIn && 
          <span className="login-form">
            <h3>Heron Haven Admin Login</h3>
            <form onSubmit={this.handleLoginSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={this.handleUserNameChange}>
              </TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                onChange={this.handlepasswordChange}>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
          </span>
        }
        {this.state.loggedIn && <MailBox></MailBox>}
        {this.state.error && <span className="error">{this.state.error}</span>}
      </div>
    );
  }
}

export default App;
