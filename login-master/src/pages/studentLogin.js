import React from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


var login_attempts=3;
var check_data;

//Validate user's input
function validate(email, password) {
  return {
    email: email.length === 0,
    password: password.length === 0
  };
}

class studentLogin extends React.Component{
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
      touched: { ...this.state.touched, [field]: true}
    });
  };

  //Check input with database
  checklogin = evt => { 
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var data = new FormData();
    data.append("email", email);
    data.append("password", password);
    //AJAX CALL - asynchronous
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost/studentLoginCheck.php", false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        check_data = this.responseText;
        console.log(check_data);
      }
    };
    xhr.send(data);
    //Check number of login
    if(check_data === "true") {
      alert("Successfully Logged In");
      console.log("successful attempt");
      this.props.history.push('/form');
    }else {
      if (login_attempts===0) {
        evt.preventDefault();
        console.log("unsuccessful attempt");
        alert("No login attempts available");
      }else {
        evt.preventDefault();
        console.log("unsuccessful attempt");
        login_attempts=login_attempts-1;
        alert("Login failed, only "+login_attempts+" login attempts available");
        if(login_attempts===0) {
          document.getElementById("email").disabled=true;
          document.getElementById("password").disabled=true;
        }
      }
    }
  };

  render(){
    //Check for input error
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
          <img className="image" src='https://asset-group.github.io/img/logo.png' alt="logo" height='90'/>
          <h3 className="index">Student Login</h3>
          <form onSubmit ={this.checklogin}>

            <TextField
              id="email"
              name="email"
              className={shouldMarkError("email") ? "error" : ""}
              type="text"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              onBlur={this.handleBlur("email")}
              variant='outlined'
            /><br/><br/>

            <TextField
              id="password"
              name="password"
              className={shouldMarkError("password") ? "error" : ""}
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onBlur={this.handleBlur("password")}
              variant='outlined'
            /><br/> <br/>

            <Button 
              type="submit" 
              id="submit" 
              disabled={isDisabled} 
              variant='contained' 
              style={{width:'100%'}}
            >Login</Button>
          </form>

          <div style={{flexDirection:'row'}}>
            <text>Not registered?</text>
            <Button 
              component={Link} 
              to='./studentAddAccount'
            >Create Account</Button>
          </div>

          <Button 
            component={Link} 
            to='./adminLogin'
          >Admin Login</Button>

        </header>
      </div>
    );
  }
}

export default studentLogin;