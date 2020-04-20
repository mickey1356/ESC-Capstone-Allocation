import React, {Component} from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import "./App.css";
import Maps from "./Map";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import sutdLogo from "../imageFile/sutdLogo.png";

// const run = require('./allocate_db.js');
// import {run} from './allocate_db';

//try map component
const AppWrapper = styled.div`
    justify-content: center;
    margin: 2em

`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
`;


export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            checked: false,
        }
    }

    handleSubmit = (evt) => {
        //evt.preventDefault();
        // alert("hello");
        fetch('http://localhost:3535/allocate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: "nothing here",
        }).catch(err => console.log(err));
    }

    render(){
      return(
        <div>
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
          </section><br></br>

          {/* Title */}
          <h2 class="title">SUTD Capstone Campus Map</h2>

          {/* Map Allocation */}
          <AppWrapper>
            <form action="http://localhost/exportDatabase/exportDatabase.php" method="post">
              <div class="input_field">
                <label>Student's Form Application: </label>
                  <button
                    type="button"
                    id="accessdb"
                    class="accessdb"
                    onClick={(e): void =>  {
                      e.preventDefault();
                      window.location.href='http://localhost:3535/registration';
                    }}
                  > Access Database</button>
                  <input 
                    type="submit" 
                    value="Export to Excel" 
                    class="btn" 
                    id="submitForm" 
                    onChange={this.handleChange}
                    onClick={this.handleEdit}
                  />
              </div>
            </form>

            <form onSubmit={this.handleSubmit}>
              <div class="input_field">
                <label>Allocate Project Booths:</label>
                <button 
                  type="submit" 
                  id="runalgo" 
                  class="runalgo"
                >Run Algorithm</button>
              </div>
            </form>

            <Maps/>

          </AppWrapper>
        </div>
      );
    }
}


/*
export default function App(){

    return (
    <Map center = {[1.3413, 103.9638]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
    );
}
*/

/*
export default class FirstComponent extends Component {

    constructor(props) {
        super(props)
        }

    render() {
        const element = (<div>Text from Element</div>)
        return (<div className="comptext">
        <h3>First Component</h3>
            <Map center = {[1.3413, 103.9638]}
            zoom={12}
            bounds= {[[0,0],[100,1000]]}
            crs={L.CRS.Simple}

            minZoom={5}>
            <TileLayer
            //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              image={L.imageOverlay('logo192.png')}
             />
            </Map>
            {element}
        </div>)
    }
}
*/





/*
class App extends Component {

    state = {
      zoom: 13
    }

    render(){
      return (
        <Map className="map" center={[1.3413, 103.9638]} zoom={this.state.zoom}>
          <TileLayer
            //attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            imageUrl='http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
            imageBounds={[[40.712216, -74.22655], [40.773941, -74.12544]]}
            L.imageOverlay(imageUrl, imageBounds)
          />
        </Map>
      );
    }
  }

  export default App;
  */
