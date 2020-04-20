import React from 'react';
import './styleform.css';
import sutdLogo from "./imageFile/sutdLogo.png";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      new_password:"",
      confirm_password:"",
      touched: {
        new_password: false,
        confirm_password: false
      }
    };
  }

  handleStudentIDChange = evt => {
    this.setState({ studentID: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ new_password: evt.target.value });
  };

  handleConfirmedPasswordChange = evt => {
    this.setState({ confirm_password: evt.target.value });
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  render(){
    return (
      <div className="Background">
        {/* Navigation Bar */}
        <section id="nav-bar">

          <nav class="navbar navbar-expand-lg navbar-light">
            <button 
              class="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <img src={sutdLogo} alt="SUTD Logo"></img>
              <ul class="navbar-nav ml-auto">
                <Link to="/form"> <li class="nav-item"> <a class="nav-link">FORM</a> </li> </Link>
                <Link to="/studentMap"> <li class="nav-item"> <a class="nav-link" href="#contact">MAP ALLOCATION</a> </li> </Link>
                <Link to="/changePassword"> <li class="nav-item"> <a class="nav-link" href="#contact">PASSWORD SETTING</a> </li> </Link>
                <Link to="/"> <li class="nav-item"> <a class="nav-link" href="#contact">LOGOUT</a> </li> </Link>
              </ul>
            </div>

          </nav>
        </section>

        {/* Reset password */}
        <body className="Header">
          <h3 class="index">Reset Password</h3>
          <form action="http://localhost/resetPassword.php" method="post">
            
              <TextField
                  id="studentID"
                  name="studentID" 
                  type="studentID" 
                  variant='outlined'
                  placeholder="Student ID"
                  value={this.state.studentID}
                  onChange={this.handleStudentIDChange}
              /><br/> <br/>

              <TextField
                  id="new_password"
                  name="new_password"
                  type="password"
                  placeholder="Enter password"
                  value={this.state.email}
                  onChange={this.handlePasswordChange}
                  onBlur={this.handleBlur("new_password")}
                  variant='outlined'
              /><br/> <br/>

              <TextField
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Enter confirmed password"
                  value={this.state.password}
                  onChange={this.handleConfirmedPasswordChange}
                  onBlur={this.handleBlur("confirm_password")}
                  variant='outlined'
              /><br/> <br/>

              <Button 
                type = "submit" 
                id="submit" 
                name= "submitform" 
                variant='contained' 
                style={{width:'100%'}}
              >Password Changed</Button>

          </form>
          <br/>
        </body>
      </div>
    );
  }
}

export default Home;