import React from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';


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
        <header className="Header">
            <form action="http://localhost/resetPassword.php" method="post">
                <TextField
                    type="studentID" 
                    id="studentID"
                    required className="form-control" 
                    name="studentID" 
                    variant='outlined'
                    placeholder="Student ID"
                    value={this.state.studentID}
                    onChange={this.handleStudentIDChange}
                />
                <br/> <br/>
                <TextField
                    id="new_password"
                    name="new_password"
                    type="password"
                    placeholder="Enter password"
                    value={this.state.email}
                    onChange={this.handlePasswordChange}
                    onBlur={this.handleBlur("new_password")}
                    variant='outlined'
                />
                <br/> <br/>
                <TextField
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="Enter confirmed password"
                    value={this.state.password}
                    onChange={this.handleConfirmedPasswordChange}
                    onBlur={this.handleBlur("confirm_password")}
                    variant='outlined'
                />
                <br/> <br/>
                
                <button type = "submit" id="submit" name= "submitform" variant='contained' style={{width:'100%'}}>
                    Password Changed
                </button>
            </form>
          <br/>
        </header>
      </div>
    );
  }
}

export default Home;