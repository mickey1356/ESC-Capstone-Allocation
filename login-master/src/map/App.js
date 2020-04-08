import React, {Component} from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import "./App.css";
import Maps from "./Map";
import {Link} from 'react-router-dom'
import styled from 'styled-components';

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
            headers: { 'Content-Type': 'application/json' },
            body: "nothing here",
        }).catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <Title>
                    SUTD Capstone Campus Map
                </Title>
                <AppWrapper>
                    <Link to="/adminAddAccount">
                      <button>Add Admin</button>
                    </Link>
                    <Link to="/adminLogin">
                      <button className="btnLogout" id="btnLogout" color="white">LOGOUT</button>
                    </Link>
                    <form onSubmit={this.handleSubmit}>
                    <button type="submit" id="runalgo">
                      Run Algorithm
                    </button>
                    </form>
                    <button
                        type="button"
                        id="accessdb"
                        onClick={(e): void =>  {
                          e.preventDefault();
                          window.location.href='http://localhost:3535/registration';
                          }}
                    > Access Database</button>
                    <Maps />
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
