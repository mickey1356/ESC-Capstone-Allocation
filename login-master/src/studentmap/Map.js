import React from 'react';
import L, { Bounds, popup } from 'leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import mappic from './combine3.png';
import { object } from 'prop-types';
import 'leaflet-easyprint';
// import '/sk yeh/Elements of Software Construction/Capstone Project/CapstoneSpaceAllocationProject/login-master/node_modules/leaflet-easyprint/dist/bundle.js'

const Wrapper = styled.div`
    width: $(props => props.width);
    height: $(props => props.height);
`;

// im width height
const WIDTH = 1191;
const HEIGHT = 1684;

//Json File
var dimensions;
//console.log(data);
 //dimensions of the various booths
var booths = {};

var colour_dict = {};

export default class Maps extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            boothID: '',
            boothID2: '',
            width: '',
            height: '',
            entries: [],
            dimensions: {},
            sWlat: '',
            sWlng: '',
            nElat: '',
            nElng: '',
            boothno: '',
            topleft1: '',
            topleft2: '',
            dim1: '',
            dim2: '',
            notallocated: '',
            newlong: '',
            newlat: '',
            oldlong: '',
            oldlat: '',
            booth: '',
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
      }
    handleChange(e){
        //this.setState({[evt.target.name]: evt.target.value})
        this.setState({
            [e.target.name]: e.target.name === 'width' || 'height' ? parseInt(e.target.value) : e.target.value,
            });

    }
    handleChange1(evt){
        this.setState({[evt.target.name]: evt.target.value});
    }
    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        try{
            this.setState({
                dimensions:{
                    ...this.state.dimensions, [this.state.boothID]:
                    [[this.state.dimensions[this.state.boothID][0][0], this.state.dimensions[this.state.boothID][0][1]], [this.state.width, this.state.height]]
                }}, () => {
                    this.addProduct(this.state.boothID);
                    console.log(this.state.dimensions[this.state.boothID])
                  });
        }
        catch{
            alert("Please Check Inputs");
        }


    }
    handleSubmit2 = event =>{
        event.preventDefault();
        console.log(this.state.boothID2);
        try{
            booths[this.state.boothID2].setPopupContent("Booth ID: " +  this.state.boothID2 + "| Group Name: " + dimensions[this.state.boothID2][2] +  "| Width: " + dimensions[this.state.boothID2][1][0] + "| Breadth: " + dimensions[this.state.boothID2][1][1] + "| X: " + dimensions[this.state.boothID2][0][0] + "| Y: " + dimensions[this.state.boothID2][0][1]).openPopup();

        }
        catch{
            alert("Please Key in Valid Booth No.")
        }
    }
    //L.rectangle([[Number(this.state.height), Number(this.state.width)],[55,110]]));
    getProducts = _ => {
        fetch('http://localhost:3535/registration')
        .then(response => response.json())
        .then(response => this.setState({entries: response.data}))
        .catch(err => console.error(err))

    };

    addProduct(boothno){
        fetch(`http://localhost:3535/registration/update?id="${boothno}"&width=${this.state.dimensions[boothno][2][0]}&height=${this.state.dimensions[boothno][2][1]}&PosX=${this.state.dimensions[boothno][0][0]}&PosY=${this.state.dimensions[boothno][0][1]}&a_width=${this.state.dimensions[boothno][1][0]}&a_height=${this.state.dimensions[boothno][1][1]}`)
        .then(response => response.json())
        .then(this.getProducts)
        .then(alert("Updated Successfully"))
        .catch(err => console.error(err))

    };

    componentDidMount(){
        this.getProducts();
        setTimeout(() => {
            if(this.state.entries != null){
                for(const key of this.state.entries.keys()){
                    this.setState({
                        dimensions:{
                            ...this.state.dimensions, [this.state.entries[key]["id"]]:
                            // 0 is pos, 1 is input dims, 2 is name, 3 is actual dims, 4 is type
                            [[this.state.entries[key]["PosX"], this.state.entries[key]["PosY"]], [this.state.entries[key]["width"], this.state.entries[key]["height"]], this.state.entries[key]["groupName"], [this.state.entries[key]["a_width"], this.state.entries[key]["a_height"]], this.state.entries[key]["category"]]
                        }

                    })
                }
            }
            console.log(this.state.dimensions);
            dimensions = this.state.dimensions;
            for(var key in dimensions){
                if(dimensions[key][0][0] && dimensions[key][0][1] == -1) {
                    this.setState({notallocated: this.state.notallocated.concat(key)});
                    this.setState({notallocated: this.state.notallocated.concat(", ")});
                }
                //var newlong = (((dimensions[key][0][0] + dimensions[key][1][0])/132)*92);
                // this.setState({newlong: (((dimensions[key][0][0] + dimensions[key][1][0])/132)*92)});
                // //var newlat = (((dimensions[key][0][1] + dimensions[key][1][1])/132)*91);
                // this.setState({newlat: (((dimensions[key][0][1] + dimensions[key][1][1])/132)*91)});
                // //var oldlong = ((dimensions[key][0][0]/132)*92);
                // this.setState({oldlong: ((dimensions[key][0][0]/132)*92)});
                // //var oldlat = ((dimensions[key][0][1]/132)*91);
                // this.setState({oldlat: ((dimensions[key][0][1]/132)*91)});

                // the database will now store the exact positions
                console.log(dimensions[key][3][0]);
                this.setState({newlong: dimensions[key][0][0] + dimensions[key][3][0]});
                this.setState({newlat: dimensions[key][0][1] + dimensions[key][3][1]});
                this.setState({oldlong: dimensions[key][0][0]});
                this.setState({oldlat: dimensions[key][0][1]});
              
                // set the colour here
                const cat = dimensions[key][4];
                let use_colour;
                if (colour_dict.hasOwnProperty(cat)) {
                    use_colour = colour_dict[cat];
                } else {
                    let r = Math.round(Math.random() * 256).toString(16);
                    let g = Math.round(Math.random() * 256).toString(16);
                    let b = Math.round(Math.random() * 256).toString(16);

                    if (r.length < 2) r = "0" + r;
                    if (g.length < 2) g = "0" + g;
                    if (b.length < 2) b = "0" + b;
                    use_colour = "#" + r + g + b;
                    colour_dict[cat] = use_colour;
                }

                //this.map.addLayer(L.rectangle([[-oldlat, oldlong], [-newlat, newlong]], {pmIgnore: false}));
                //var booth = L.rectangle([[-oldlat, oldlong], [-newlat, newlong]], {pmIgnore: false});
                console.log(this.state.oldlat, this.state.oldlong, this.state.newlat, this.state.newlong);
                this.setState({booth: L.rectangle([[-this.state.oldlat, this.state.oldlong], [-this.state.newlat, this.state.newlong]], {color: use_colour, pmIgnore: false}).bindTooltip(key, {permanent: true, direction: 'center', className: 'popup', displayColors: false})});
                //var booth2 = L.rectangle([[-67.12121212121212, 26.484848],[-57.469,42.5]]).addTo(this.map);
                this.state.booth.pm.enable({
                    allowSelfIntersection: false,
                });
                this.state.booth.bindPopup(
                    "Booth ID: " +  key + "| Group Name: " + dimensions[key][2] + "| Category: " + dimensions[key][4] + "| Width: " + dimensions[key][1][0] + "| Breadth: " + dimensions[key][1][1] + "| X: " + dimensions[key][0][0] + "| Y: " + dimensions[key][0][1] );
                booths[key] = this.state.booth;
                this.state.booth.addTo(this.map);

                //If point is edited
                this.state.booth.on('pm:edit', e => {
                        this.setState({sWlat: e.target._bounds._southWest.lat});
                        this.setState({sWlng: e.target._bounds._southWest.lng});
                        this.setState({nElat: e.target._bounds._northEast.lat});
                        this.setState({nElng: e.target._bounds._northEast.lng});
                        //get booth no. and convert to int
                        //topleft1 is dimensions[key][0][0], topleft2 is dimensions[key][0][1]
                        this.setState({boothno: e.target._popup._content.slice(10,13) });
                        // this.setState({topleft1: Math.round((this.state.sWlng/92)*132)});
                        // this.setState({topleft2: Math.round((-this.state.nElat/91)*132)});
                        // this.setState({dim1: Math.round(((this.state.nElng/92)*132)-this.state.topleft1)});
                        // this.setState({dim2: Math.round(((-this.state.sWlat/91)*132)-this.state.topleft2)});

                        // update database to exact positions
                        this.setState({topleft1: this.state.sWlng});
                        this.setState({topleft2: -this.state.nElat});
                        this.setState({dim1: this.state.nElng - this.state.topleft1});
                        this.setState({dim2: -this.state.sWlat - this.state.topleft2});

                        // convert dim1 and dim2 back to the integer dimensions
                        const y = this.state.topleft2;
                        const imw = this.state.dim1;
                        const imh = this.state.dim2;

                        if (y > 250) {
                            // level 2
                            const ow = imw * 1191 * 124 / (298 * 913 * 2);
                            const oh = imh * 1684 * 81 / (421 * 524 * 2);
                            this.setState({ori1: Math.round(ow * 10) / 10});
                            this.setState({ori2: Math.round(oh * 10) / 10});
                        } else {
                            // level 1
                            const ow = imw * 1191 * 130 / (298 * 611 * 2);
                            const oh = imh * 1684 * 134 / (421 * 640 * 2);
                            this.setState({ori1: Math.round(ow * 10) / 10});
                            this.setState({ori2: Math.round(oh * 10) / 10});
                        }

                        booths[this.state.boothno].setPopupContent("Booth ID: " +  this.state.boothno + "| Group Name: " + dimensions[this.state.boothno][2]  + "| Category: " + dimensions[this.state.boothno][4] + "| Width: " + this.state.ori1 + "| Breadth: " + this.state.ori2 + "| X: " + this.state.topleft1 + "| Y: " + this.state.topleft2);

                        this.setState({
                            dimensions:{
                                ...this.state.dimensions, [this.state.boothno]:
                                [[this.state.topleft1, this.state.topleft2], [this.state.dim1, this.state.dim2], [this.state.ori1, this.state.ori2]]
                            }}, () => {
                                this.addProduct(this.state.boothno);
                            });




                    //console.log(boothno, "old", dimensions[boothno], "new", [[topleft1, topleft2], [dim1,dim2]]);
                });


            }
        }, 1000);

        this.map = L.map('map',
        {
            crs: L.CRS.Simple,
            minZoom: 1,
            maxZoom: 3,
            zoomControl: true,
            center: [0,0],
            zoom: 1,
        });
        //w and h based on the size of the image
        var w = WIDTH;
        var h = HEIGHT;
        var imageUrl = mappic;
        var southWest = this.map.unproject([ 0, h], this.map.getMaxZoom()-1);
        var northEast = this.map.unproject([ w, 0], this.map.getMaxZoom()-1);
        var bounds = new L.LatLngBounds( southWest, northEast);
        L.imageOverlay(imageUrl, bounds).addTo(this.map);
        // console.log(bounds);

        // y, x => ny, nx
        // tl: 0, 0 (x,y)
        // br: 298, -421 (x,y) (down is negative)
        // lvl1:[0 0 297 -210] [0 -211 297 -421]
        // 300.8 386.865671641791 408.90000000000003 453.731343283582
        // var booth0001 = L.rectangle([[-16.75, 86.57], [-176.76, 239.45]], {pmIgnore: false});
        // var booth0002 = L.rectangle([[-211, 0], [-421, 10]], {pmIgnore: false});

        // booth0001.addTo(this.map);
        // booth0002.addTo(this.map);

        L.easyPrint({title: 'Print Map', position: 'topleft', sizeModes: ["A4Portrait"]}).addTo(this.map);

        //adds the various booths to the map

        //top left and bottom right
        //dimensions of full map [[-100,540], [100,-180]]
        //console.log(booths);
        this.map.setMaxBounds(bounds);
        this.map.pm.setGlobalOptions({allowSelfIntersection: false});
        //Sets toolbar on the left map
        this.map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
            drawMarker: false,
            drawPolygon: false,
            drawPolyline: false,
            drawCircleMarker: false,
            cutPolygon: false,
            drawRectangle: false,
            editMode: false, 
            removalMode: false,
            dragMode: false,

          });
        this.map.on('pm:remove', e =>{
            if(e.layer._popup._content != null){
                this.setState({boothno: e.layer._popup._content.slice(10,13)});
                this.setState({
                    dimensions:{
                        ...this.state.dimensions, [this.state.boothno]:
                        [[-1,-1], [this.state.dimensions[this.state.boothno][1][0], this.state.dimensions[this.state.boothno][1][1]]]
                    }}, () => {
                        this.addProduct(this.state.boothno);
                      });
                window.location.reload(false);
                //this.setState({notallocated: this.state.notallocated.concat(this.state.boothno)});
                //this.setState({notallocated: this.state.notallocated.concat(", ")});

                //this.setState({notallocated: " "})



            }
        });



    }


    render(){
        return (
            <div>

                <form onSubmit = {this.handleSubmit2} >
                    <label>
                        Booth ID:
                    </label>
                    <input
                    type="text" name="boothID2" id="boothID2" onChange={this.handleChange1}/>
                    <button type="submit" id="viewbtn">View Booth on Map</button>
                </form>
                <label>
                    Booths Yet To Be Allocated: {this.state.notallocated}
                </label>



                <Wrapper width="512px" height="512px" id="map" />
            </div>
        )
    }
}
