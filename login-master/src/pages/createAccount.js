import React, { Component } from 'react';
import "./style.css";
import { FormErrors } from './formErrors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

class createAccount extends Component {
  constructor (props) {
    super(props);
    this.state = {
      studentID:'',
      email: '',
      groupName:'',
      password: '',
      formErrors: {studentID:'', email: '', groupName:'', password: ''},
      studentIDValid: false,
      emailValid: false,
      groupNameValid: false,
      passwordValid: false,
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
    let studentIDValid = this.state.studentIDValid;
    let emailValid = this.state.emailValid;
    let groupNameValid = this.state.groupNameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'studentID':
        studentIDValid = value.length === 7 && value.match(/^[0-9\b]+$/);
        fieldValidationErrors.studentID = studentIDValid ? '': ' is not valid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'groupName':
        groupNameValid = value.length > 0;
        fieldValidationErrors.groupName = groupNameValid ? '': ' is not valid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      studentIDValid: studentIDValid,
      emailValid: emailValid,
      groupNameValid: groupNameValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.studentIDValid && this.state.emailValid && this.state.groupNameValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <div className="Background">
        <header className='Header'>
          <img src='https://asset-group.github.io/img/logo.png' alt="logo" height='50'/>
          <br/><br/>
          <form action="http://localhost/connectlogin.php" method="post">
            <div className={`form-group ${this.errorClass(this.state.formErrors.studentID)}`}>
              <TextField
                type="studentID" required className="form-control" name="studentID" variant='outlined'
                placeholder="Student ID"
                value={this.state.studentID}
                onChange={this.handleUserInput}
              />
            </div>
            <br/>

            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <TextField
                type="email" required className="form-control" name="email" variant='outlined'
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </div>
            <br/>

            <div className={`form-group ${this.errorClass(this.state.formErrors.groupName)}`}>
              <TextField
                type="groupName" required className="form-control" name="groupName" variant='outlined'
                placeholder="Group Name"
                value={this.state.groupName}
                onChange={this.handleUserInput}
              />
            </div>
            <br/>
            
            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
              <TextField
                type="password" className="form-control" name="password" variant='outlined'
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}
              />
            </div>

            <div className='ErrorText'>
              <FormErrors className='ErrorText' formErrors={this.state.formErrors} />
            </div>

            <br/>
            {/* <Button type="submit" disabled={!this.state.formValid} variant='contained' style={{width:'100%'}} component={Link} to='./form'>Register</Button> */}
            <Button type="submit" disabled={!this.state.formValid} variant='contained' style={{width:'100%'}}>Register</Button>
          </form>
          <br/><br/>
          <div style={{flexDirection:'row'}}>
            <text>Registered?</text>
            <Button component={Link} to='/'>
              Login
            </Button>
          </div>

        </header>
      </div>
    )
  }
}

export default createAccount;