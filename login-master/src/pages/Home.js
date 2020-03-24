import React from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="Background">
      <header className="Header">
        <img src='https://asset-group.github.io/img/logo.png' alt="logo" height='50' width='225'/>
        <br/><br/>
        <TextField id='Student_email' label='Student Email' variant='outlined'/>
        <br/>
        <TextField id='Student_password' label='Password' variant='outlined'/>
        <br/>
        <Link to='/form'>
            <Button id='button'>Login</Button>
        </Link>
      </header>
    </div>
  );
}