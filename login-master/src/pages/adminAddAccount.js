import React, { Component } from 'react';
import { FormErrors } from './formErrors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

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

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    // let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@(mymail.sutd.edu.sg)$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid, please use your school email';
        break;
      // case 'password':
      //   passwordValid = value.length >= 6;
      //   fieldValidationErrors.password = passwordValid ? '': ' is too short';
      //   break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      emailValid: emailValid
      // passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

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
        <header className='Header'>
          <img src='https://asset-group.github.io/img/logo.png' alt="logo" height='50'/>
          <br/><br/>
          <form action="http://localhost/adminAdd.php" onSubmit={this.sendEmail} method="post">
            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <TextField
                type="email" required className="form-control" name="email" variant='outlined'
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </div>
            <br/>
            
            <div>
              <TextField
                type="hidden" className="form-control" name="password" variant='outlined' display='none'
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}
              />
            </div>

            <div className='ErrorText'>
              <FormErrors className='ErrorText' formErrors={this.state.formErrors} />
            </div>

            <br/>
            <button type="submit" name="submitbtn" disabled={!this.state.formValid} variant='contained' style={{width:'100%'}}>Add admin account</button>
          </form>
          <br/>
        </header>
      </div>
    )
  }
}

export default createAccount;