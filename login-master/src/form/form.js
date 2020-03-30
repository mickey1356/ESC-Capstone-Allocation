import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as legoData from "./loadingJson/legoloading";
import * as doneData from "./loadingJson/doneloading";
import sutdLogo from "./sutdLogo.png";


//Form input initial state
const initialState = {
  groupName: "",
  category: "",
  company: "",
  width: "",
  breadth: "",
  height: "",
  sizeNweight: "",
  powerpoints: "",
  pedestal: "",
  otherRequest: ""
}

//Loading page
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


export default class form extends React.Component {

  //Loading page
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  componentDidMount() {
    //runs automatically when the component is rendered on the screen
    //make an API call and set the state.done to true once it has finished
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts",)
        .then(response => response.json())
        .then(json => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ done: true });
          }, 1000);
        });
    }, 1200);
  }

  //Validating form input
  state = initialState;

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    //error messages
    let groupNameError = "";
    let categoryError = "";
    let companyError = "";
    let showcaseSpaceError = ""
    let sizeNweightError = "";
    let powerpointsError = "";
    let pedestalError = "";
    let otherRequestError = "";

    if (!this.state.groupName) {
      groupNameError = "Group Name cannot be empty";
    }
    if (!this.state.category) {
      categoryError = "Category cannot be empty";
    }
    if (!this.state.company) {
      companyError = "Company cannot be empty";
    }
    if (!this.state.width || !this.state.breadth || !this.state.height) {
      showcaseSpaceError = "Show case space cannot be empty";
    }
    if (!this.state.sizeNweight) {
      sizeNweightError = "Size and weight cannot be empty";
    }
    if (!this.state.powerpoints) {
      powerpointsError = "Powerpoints cannot be empty";
    }
    if (!this.state.pedestal) {
      pedestalError = "Pedestal cannot be empty";
    }
    if (!this.state.otherRequest) {
      otherRequestError = "Other requests cannot be empty";
    }

    if (groupNameError || categoryError || companyError || showcaseSpaceError || sizeNweightError || powerpointsError || pedestalError || otherRequestError) {
      this.setState({ groupNameError, categoryError, companyError, showcaseSpaceError, sizeNweightError, powerpointsError, pedestalError, otherRequestError }); //setting the object here
      return false;
    }

    return true;
  }

  limitDecimalPlaces = (e, count) => {
    if (e.target.value.indexOf('.') === -1) { return; }
    if ((e.target.value.length - e.target.value.indexOf('.')) > count) {
      e.target.value = parseFloat(e.target.value).toFixed(count);
    }
  }

  handleSubmit = event => {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
    } else {
      event.preventDefault();
    }

    // fetch('/database', { 
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     groupName: this.state.groupName,
    //     prototype: this.state.prototype,
    //     category: this.state.category,
    //     company: this.state.company,
    //     showcaseSpace: this.state.showcaseSpace,
    //     sizeNweight: this.state.sizeNweight,
    //     powerpoints: this.state.powerpoints,
    //     pedestal: this.state.pedestal,
    //     otherRequest: this.state.otherRequest
    //   })
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.log(err))
  };

  render() {
    return (

      <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

        {/* Loading Page */}
        {!this.state.done ? (
          <FadeIn>
            <div class="d-flex justify-content-center align-items-center">
              <h1>Capstone Space Allocation</h1>
              {!this.state.loading ? (
                <Lottie options={defaultOptions} height={120} width={120} />
              ) : (
                  <Lottie options={defaultOptions2} height={120} width={120} />
                )}
            </div>
          </FadeIn>
        ) : (

          <body>
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
                  <Link to="/">
                    <text className="btnLogout" color="white">LOGOUT</text>
                  </Link>
                </div>

              </nav>
            </section>

            {/* Home Section */}
            <section id="home">
              <div class="home">
                <h2>Capstone Space Allocation</h2>
                <pre>Now that you have completed your Capstone Project, it is time to present your products!
              {"\n"} Please fill in the form as provided in the page below.
              {"\n"} If you have any further enquiries, please contact the Capstone Office. Thank you!</pre>
              </div>

              <form action="http://localhost/export/export.php" method="post">
                <div class="input_field">
                  <input type="submit" value="Students' Application" class="btn" id="submitForm" />
                </div>
              </form>
            </section>

            {/* Form Section*/}
            <section id="form" class="forms">
              <div class="wrapper">
                <div class="title">Form</div>

                <div className="form">
                  <form name="myForm" action="http://localhost/connect.php" onSubmit={this.handleSubmit} method="post">
                  {/* <form name="myForm" action="/database" onSubmit={this.handleSubmit} method="post"> */}

                    <div class="input_field">
                      <label>Group Name:</label>
                      <input 
                        type="text" 
                        className="input" 
                        id="groupName" 
                        name="groupName"
                        ref="groupName"
                        placeholder="Enter your Group Name"
                        value={this.state.groupName} 
                        onChange={this.handleChange} 
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.groupNameError}
                    </div>

                    <div class="input_field">
                      <label>Type of Prototype:</label>
                      <div className="custom_select">
                        <select name="prototype" id="prototype" ref="prototype">
                          <option value="">Select</option>
                          <option value="web-based">Web-based</option>
                          <option value="software">Software</option>
                          <option value="1:1 prototype">1:1 Prototype</option>
                        </select>
                      </div>
                    </div>

                    <div class="input_field">
                      <label>Category:</label>
                      <input 
                        type="text" 
                        class="input" 
                        id="category" 
                        name="category"
                        ref="category"
                        placeholder="e.g. Finance"
                        value={this.state.category} 
                        onChange={this.handleChange} 
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.categoryError}
                    </div>

                    <div class="input_field">
                      <label>Company:</label>
                      <input 
                        type="text" 
                        class="input" 
                        id="company" 
                        name="company"
                        ref="company"
                        placeholder="e.g. OCBC, Alcatel-Lucent"
                        value={this.state.company} 
                        onChange={this.handleChange} 
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.companyError}
                    </div>

                    <div class="input_field_showcase">
                      <label>Showcase Space Needed:</label>
                      <input 
                        type="text" 
                        class="input" 
                        id="width" 
                        name="width"
                        ref="width"
                        placeholder="width"
                        value={this.state.width}
                        onChange={this.handleChange} 
                        width="50px"
                      />
                      <text> m </text>
                      <input 
                        type="text" 
                        class="input" 
                        id="breadth" 
                        name="breadth"
                        ref="breadth"
                        placeholder="breadth"
                        value={this.state.breadth} 
                        onChange={this.handleChange} 
                      />
                      <text> m </text>
                      <input 
                        type="text" 
                        class="input" 
                        id="height" 
                        name="height"
                        ref="height"
                        placeholder="height"
                        value={this.state.height} 
                        onChange={this.handleChange} 
                      />
                      <text> m </text>
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.showcaseSpaceError}
                    </div>

                    <div class="input_field">
                      <label>Size and Weight of Physical Prototype:</label>
                      <input 
                        type="text" 
                        class="input" 
                        id="sizeNweight" 
                        name="sizeNweight"
                        ref="sizeNweight"
                        placeholder="e.g. 1m x 1m x 1.1m"
                        value={this.state.sizeNweight} 
                        onChange={this.handleChange}
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.sizeNweightError}
                    </div>

                    <div class="input_field">
                      <label>No of Power Points Needed:</label>
                      <input 
                        type="number" 
                        class="input" 
                        id="powerpoints" 
                        name="powerpoints"
                        ref="powerpoints"
                        placeholder="Enter an integer"
                        value={this.state.powerpoints} 
                        onChange={this.handleChange} 
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.powerpointsError}
                    </div>

                    <div class="input_field">
                      <label>Pedestal(s):</label>
                      <input 
                        type="text" 
                        class="input" 
                        id="pedestal" 
                        name="pedestal"
                        ref="pedestal"
                        placeholder="1 short"
                        value={this.state.pedestal} 
                        onChange={this.handleChange}
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.pedestalError}
                    </div>

                    <div class="input_field">
                      <label>Other Requests: {"\n"} (Do not exceed 20 words)</label>
                      <textarea 
                        class="textarea" 
                        id="otherRequest" 
                        name="otherRequest" 
                        ref="otherRequest"
                        maxLength="20"
                        placeholder="e.g. 1 Table, 2 Monitors"
                        value={this.state.otherRequest} 
                        onChange={this.handleChange} 
                      />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.otherRequestError}
                    </div>

                    <div class="input_field">
                      <input 
                        type="submit" 
                        value="Submit" 
                        class="btn" 
                        id="submit" 
                        onChange={this.handleChange}
                        onClick={this.handleEdit}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
              <div class="container text-center">
                <p>SUTD Capstone Office</p>
                <div class="follow"><b>Phone: </b><i class="fa fa-phone"></i> +65 87654321</div>
                <div class="follow"><b>Email: </b><i class="fa fa-envelope-o"></i> capstone@sutd.edu.sg</div>
              </div>
            </section>

          </body>
        )}
      </div>
    );
  }
}

var input;
document.addEventListener("onclick", function(){
  input = document.getElementById("input").toFixed(1);
})
