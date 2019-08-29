import React, {Component} from 'react';
import './App.css';
import AuthenticationService from './services/AuthenticationService';
import MessagesService from './services/MessagesService';
import MailBox from './components/MailBox';
import boardwalk from './assets/boardwalk.jpg';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
    MessagesService.getMessages(); // Wake up free Heroku api so first login is faster
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    let loggedIn = !!localStorage.getItem('token');
    this.setState({ loggedIn });
  }

  logout = () => {
    localStorage.removeItem('token');
    this.checkIfLoggedIn();
  }

  async login() {
    try {
      let response = await AuthenticationService.login({
        email: 'apply@match.com',
        password: '12345678'
        // email: this.state.email,
        // password: this.state.password
      });
      let { user, token } = response.data;
      this.setState({ loggedIn: true });
      localStorage.setItem('token', token);
    } catch (error) {
      localStorage.removeItem('token');
      this.setState({ error: error.response.data.error });
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
          <span className="login-page">
            <h3>Heron Haven Admin Login</h3>
            <form onSubmit={this.handleLoginSubmit} className="login-form">
              <TextField
                className="input"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={this.handleUserNameChange}>
              </TextField>
              <TextField
                className = "input"
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
            <img className="fit-image" src={boardwalk} alt="Boardwalk through wetland"></img>
          </span>
        }
        {this.state.loggedIn && <MailBox logout={this.logout}></MailBox>}
        {this.state.error && <span className="error">{this.state.error}</span>}
      </div>
    );
  }
}

export default App;
