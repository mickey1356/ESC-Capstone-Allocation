import React from 'react';
import './style.css';
import sampleForm from './sampleForm.PNG';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

function validateForm(){
  var groupName = document.forms["form"]["groupName"].value;
  var showcaseSpace = document.forms["form"]["showcaseSpace"].value;
  var sizeNweight = document.forms["form"]["sizeNweight"].value;
  var powerpoints = document.forms["form"]["powerpoints"].value;
  var pedestal = document.forms["form"]["pedestal"].value;
  var otherRequest = document.forms["form"]["otherRequest"].value;
  if(groupName=="" | showcaseSpace=="" |  sizeNweight=="" | powerpoints=="" | pedestal=="" | otherRequest==""){
    alert("Empty field must be filled");
    return false;
  }
}

export default function form() {

    return (
      <div>
        <body>

          <section id="nav-bar">
            
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

            <nav class="navbar navbar-expand-lg navbar-light">

              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">

                  <li class="nav-item">
                    <a class="nav-link" href="#home">HOME</a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="#form">FORM</a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="#contact">CONTACT</a>
                  </li>

                </ul>

                <Link to='/'>
                  <Grid container justify="flex-end">
                    <Button className='btnLogout'>Logout</Button>
                  </Grid>
                </Link>
                
              </div>
            </nav>
          </section>

          {/* Home Section */}
          <section id='home'>
            <div class='home'>
              <h2>Capstone Space Allocation</h2>
              <pre>Now that you have completed your Capstone Project, it is time to present your products! 
                {'\n'} Please follow the format as shown in the image below.
                {'\n'} If you have any further enquiries, please contact the Capstone Office. Thank you!</pre>
              <img src={sampleForm} alt="Sample Form"></img>
            </div>

            <form action='http://localhost/export/export.php' method='post'>
              <div class="input_field">
                <input type="submit" value="Students' Application" class="btn" id="submit"/>
              </div>
            </form>

          </section>

          {/* Form Section*/}
          <section id='form' class='forms'>
            <div class='wrapper'>
              <div class = 'title'>
                Form
              </div>
              

              {/* <Popup trigger={<button className="btnSample"> Sample Form Reference </button>} modal>
                  {close => (
                  <div className="modal">
                      <a className="close" onClick={close}>
                      &times;
                      </a>
                      <div className="header"> Sample Form Reference </div>
                      <div className="content">
                          <img src={sampleForm}></img>
                      </div>
                      <div className="actions">

                      </div>
                  </div>
                  )}
              </Popup> */}

              <div className='form'>
                <form name='form' onSubmit="return validateForm()" action='http://localhost/connect.php'  method='post'>
                  <div class='input_field'>
                    <label>Group Name:</label>
                    <input type='text' className='input' id='groupName' name='groupName'/>
                  </div>

                  <div class="input_field">
                    <label>Type of Prototype:</label>
                    <div className="custom_select">
                      <select name="prototype">
                        <option value="">Select</option>
                        <option value="web-based">Web-based</option>
                        <option value="software">Software</option>
                        <option value="1:1 prototype">1:1 Prototype</option>
                      </select>
                    </div>
                  </div>

                  <div class="input_field">
                    <label>Showcase Space Needed:</label>
                    <input type="text" class="input" name="showcaseSpace"/>
                  </div>

                  <div class="input_field">
                    <label>Size and Weight of Physical Prototype:</label>
                    <input type="text" class="input" name="sizeNweight"/>
                  </div>

                  <div class="input_field">
                    <label>No of Power Points Needed:</label>
                    <input type="text" class="input" name="powerpoints"/>
                  </div>

                  <div class="input_field">
                    <label>Pedestal(s):</label>
                    <input type="text" class="input" name="pedestal"/>
                  </div>

                  <div class="input_field">
                    <label>Other Requests:</label>
                    <textarea class="textarea" name="otherRequest" maxLength="300"/>
                  </div>

                  <div class="input_field">
                    <input type="submit" value="Submit" class="btn" id="submit"/>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section id="contact">
            <div class="container text-center">
              <p>SUTD Capstone Office</p>
              <div class="follow"><b>Phone: </b><i class="fa fa-phone"></i> +65 87654321</div>
              <div class="follow"><b>Email: </b><i class="fa fa-envelope-o"></i> capstone@sutd.edu.sg</div>
            </div>
          </section>

          <script src="js/smooth-scroll.js"></script>
          <script>
            var scroll = new SmoothScroll('a[href*="#"]');
          </script>
          
        </body>
      </div>
    );
  }