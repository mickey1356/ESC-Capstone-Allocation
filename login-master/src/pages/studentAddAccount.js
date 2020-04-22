import React, { Component } from 'react';
import "./style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormErrors } from './inputError';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

class createAccount extends Component {
  constructor (props) {
    super(props);
    this.state = {
      studentID:'',
      email: '',
      groupName:'',
      password: Math.random()*100000 | 0,
      formErrors: {studentID:'', email: '', groupName:''},
      studentIDValid: false,
      emailValid: false,
      groupNameValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  //Validate student's input
  validateForm() {
    this.setState({formValid: this.state.studentIDValid && this.state.emailValid && this.state.groupNameValid});
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let studentIDValid = this.state.studentIDValid;
    let emailValid = this.state.emailValid;
    let groupNameValid = this.state.groupNameValid;

    switch(fieldName) {
      case 'studentID':
        studentIDValid = value.length === 7 && value.match(/^[0-9\b]+$/);
        fieldValidationErrors.studentID = studentIDValid ? '': ' is not valid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@(mymail.sutd.edu.sg)$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid, please use your school email';
        break;
      case 'groupName':
        groupNameValid = value.length > 0;
        fieldValidationErrors.groupName = groupNameValid ? '': ' is not valid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      studentIDValid: studentIDValid,
      emailValid: emailValid,
      groupNameValid: groupNameValid,
    }, this.validateForm);
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  //Activate account by using random password sent to student's email
  sendEmail = () => {
    //AJAX CALL - asynchronous
    var studentID=document.getElementById("studentID").value;
    var email=document.getElementById("email").value;
    var groupName=document.getElementById("groupName").value;
    var password=document.getElementById("password").value;
    var data = new FormData();
    data.append("studentID", studentID);
    data.append("email", email);
    data.append("groupName", groupName);
    data.append("password", password);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost/studentAddAccount.php", false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("database updated");
      }
    };
    xhr.send(data);

    var template_params = {
      "email": this.state.email,
      "groupName": this.state.groupName,
      "password": this.state.password 
   }
    var service_id = "gmail";
    var template_id = "template_wyiwqdxd";
    var user_id = "user_CBEFF7EPbL1I4OdtdZnki"
    emailjs.send(service_id, template_id, template_params, user_id);
    this.props.history.push('/form');
  }

  render () {
    return (
      <div className="Background">

        {/* Add Student Account */}
        <header className='Header'>
          <img className="image" src='https://asset-group.github.io/img/logo.png' alt="logo" height='90'/>
          <h3 className="index">Register Student Account</h3>
          <form onSubmit={this.sendEmail}>
            <div className={`form-group ${this.errorClass(this.state.formErrors.studentID)}`}>
              <TextField
                type="studentID" 
                name="studentID"
                id="studentID"
                variant='outlined'
                placeholder="Student ID"
                value={this.state.studentID}
                onChange={this.handleUserInput}
              />
            </div>

            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <TextField
                type="email" 
                name="email"
                id="email"
                variant='outlined'
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </div>

            <div className={`form-group ${this.errorClass(this.state.formErrors.groupName)}`}>
              <TextField
                type="groupName" 
                name="groupName" 
                id="groupName"
                variant='outlined'
                placeholder="Group Name"
                value={this.state.groupName}
                onChange={this.handleUserInput}
              />
            </div>
            
            <div>
              <input
                type="hidden" 
                className="form-control" 
                name="password" 
                id="password"
                variant='outlined'
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
              variant='contained' 
              style={{width:'100%'}}
            >Register</Button>
          
          </form>

          <div style={{flexDirection:'row'}}>
            <text>Already have an account?</text>
            <Button component={Link} to='./'>Login</Button>
          </div>

        </header>
      </div>
    )
  }
}

export default createAccount;