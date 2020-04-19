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
            headers: {'Content-Type': 'application/json' },
            body: "nothing here",
        }).catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <Title>
                    SUTD Capstone Campus Map
                </Title>
                <Title>
                    Student
                </Title>
                <AppWrapper>
                    <Maps />
                </AppWrapper>
            </div>



        );
    }

}




