import React, {Component} from 'react';
import './App.css';
import AuthenticationService from './services/AuthenticationService';
import MailBox from './components/MailBox';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
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
    this.login();
  }

  render() {
    return (
      <div className="App-body">
        {!this.state.loggedIn && 
          <span className="login-form">
            <form onSubmit={this.handleLoginSubmit}>
              <input type="text" onChange={this.handleUserNameChange} placeholder="Username"></input>
              <input type="password" onChange={this.handlepasswordChange} placeholder="Password"></input>
              <button type="submit">Login</button>
            </form>
          </span>
        }
        {this.state.loggedIn && <MailBox></MailBox>}
        {this.state.error && <span>{this.state.error}</span>}
      </div>
    );
  }
}

export default App;
