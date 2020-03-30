import React from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0
  };
}

class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      email:"",
      password:"",

      touched: {
        email:false,
        password: false
      }
    };
  }

  handleEmailChange = evt => {
    this.setState({
      email:evt.target.value
    });
  }

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  };

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render(){
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div className="Background">
        <header className="Header">
          <img src='https://asset-group.github.io/img/logo.png' alt="logo" height='50'/>
          <br/><br/>
          <form action="http://localhost/connectlogin.php" onSubmit={this.handleSubmit}>
            <TextField
              className={shouldMarkError("email") ? "error" : ""}
              type="text"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              onBlur={this.handleBlur("email")}
              variant='outlined'
            />
            <br/> <br/>
            <TextField
              className={shouldMarkError("password") ? "error" : ""}
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onBlur={this.handleBlur("password")}
              variant='outlined'
            />
            <br/> <br/>
            <Button disabled={isDisabled} component={Link} to='./form' variant='contained' style={{width:'100%'}}>
              Login
            </Button>
          </form>
          <br/><br/>
          <div style={{flexDirection:'row'}}>
            <text>Not registered?</text>
            <Button component={Link} to='./createAccount'>
              Create Account
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default Home;