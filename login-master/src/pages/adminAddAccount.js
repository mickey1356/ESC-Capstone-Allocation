import React, { Component } from 'react';
import './style.css';
import sutdLogo from "../imageFile/sutdLogo.png";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com';
import { FormErrors } from './inputError';
import { Link } from 'react-router-dom';


class createAccount extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: Math.random()*100000 | 0,
      formErrors: {email: ''},
      emailValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
    () => { this.validateField(name, value) });
  }

  //Validate admin's input
  validateForm() {
    this.setState({formValid: this.state.emailValid});
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@(mymail.sutd.edu.sg)$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid, please use your school email';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      emailValid: emailValid
    }, this.validateForm);
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  //Activate account by using random password sent to admin's email
  sendEmail = () => {
    var template_params = {
      "email": this.state.email,
      "password": this.state.password
    }
    var service_id = "default_service";
    var template_id = "addadmin";
    var user_id = "user_CBEFF7EPbL1I4OdtdZnki"
    emailjs.send(service_id, template_id, template_params, user_id);
  }

  render () {
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
                <Link to="/map"> <li class="nav-item"> <a class="nav-link" href="#contact">MAP ALLOCATION</a> </li> </Link>
                <Link to="/adminAddAccount"> <li class="nav-item"> <a class="nav-link" href="#contact">ADD ADMIN ACCOUNT</a> </li> </Link>
                <Link to="/adminLogin"> <li class="nav-item"> <a class="nav-link" href="#contact">LOGOUT</a> </li> </Link>
              </ul>
            </div>

          </nav>
        </section>

        {/* Add Admin Account */}
        <body className='Header'>
          <h3 className="index">Add Admin Account</h3>
          <form action="http://localhost/adminAddAccount.php" onSubmit={this.sendEmail} method="post">
            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <TextField
                type="email" 
                name="email" 
                variant='outlined'
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </div><br/>
            
            <div>
              <input
                type="hidden" 
                className="form-control" 
                name="password" 
                display='none'
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}
              />
            </div>

            <div className='ErrorText'>
              <FormErrors className='ErrorText' formErrors={this.state.formErrors} />
            </div><br/>

            <Button
              type="submit" 
              name="submitbtn" 
              disabled={!this.state.formValid} 
              variant='contained' style={{width:'100%'}}
            >Add admin account</Button>
          
          </form>

        </body>
      </div>
    )
  }
}

export default createAccount;