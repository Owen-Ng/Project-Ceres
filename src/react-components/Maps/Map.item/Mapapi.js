import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer ,withLeaflet} from "react-leaflet";
import { Icon } from "leaflet";
import './Mapapi.css'
import Search from "react-leaflet-search/lib/Search-v1";
import * as parkdata from '../data/groceries.json'
const someicon = new Icon ({iconUrl: "/cart.svg", iconSize:15}); 
const active = new Icon({iconUrl:"/basket", iconSize: 20})
export default class PublicMap extends Component {
  constructor(props) {
    super(props)
  }
  
  state=null
  //coor = this.props.city;
  data(map){
    
    this.props.senddata(map.properties.NAME, map.properties.ADDRESS, map.properties.OPEN, map.properties.NOTES)
  }
  selected(park){
    return(
    <Marker key = {park.properties.PARK_ID} position={[
      park.geometry.coordinates[1], 
      park.geometry.coordinates[0]
     
    ]}
    icon= {active}
    />
    )
  }
 
  render(){
    const SearchComponent = withLeaflet(Search);
      return(
        <div>
        <Map center={[this.props.city[0], this.props.city[1]]} zoom={12}>
               <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <SearchComponent className="search"
          customProvider={this.provider}
          position="topright"
          inputPlaceholder="Enter Address here"
          search={[33.100745405144245, 46.48315429687501]}
          showMarker={false}
          zoom={5}
          showPopup={false}
          popUp={this.customPopup}
          closeResultsOnClick={true}
          openSearchOnLoad={true}
          searchBounds={[
            [33.100745405144245, 46.48315429687501],
            [44.55916341529184, 24.510498046875]
          ]}
         
         
        />
         
        {parkdata.features.map(park =>(
          <Marker key = {park.properties.PARK_ID} position={[
            park.geometry.coordinates[1], 
            park.geometry.coordinates[0]
           
          ]}
          onClick={()=>{this.setState(park); this.data(park);this.selected(park);

            
          }}
          icon = {someicon}/>
         
        )
        )
      }
      {/* {this.state!='null'  && (
        <Popup
        
        position={[
          this.state.geometry.coordinates[1],
          this.state.geometry.coordinates[0]
        ]}
        onClose={()=>{this.setState(null)}}
        >
          <div>
            <h2>{this.state.properties.NAME}</h2>
      <p>{this.state.properties.ADDRESS}</p>
      <p>{this.state.properties.OPEN}</p>
      <p>{this.state.properties.NOTES}</p>
          </div>
        </Popup>
      )}
       */}
       {this.state && (
       <Marker key = {this.state.properties.PARK_ID} position={[
            this.state.geometry.coordinates[1], 
            this.state.geometry.coordinates[0]
           
          ]}
          icon = {active}/>)}
        
      </Map>
{/* 
     <button onClick={()=>console.log(this.props.name)}>♥</button>
   <button onClick={()=>console.log(this.state)}>♥</button> */}
   </div>
  
  )  
  }
 }


























// import OlMap from "ol/Map";
// import OlView from "ol/View";
// import OlLayerTile from "ol/layer/Tile";
// import OlSourceOSM from "ol/source/OSM";
// import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
// class PublicMap extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { center: [0, 0], zoom: 1 };

//     this.olmap = new OlMap({
//         interactions: defaultInteractions().extend([
//             new DragRotateAndZoom()
//           ]),
//         dragging:true,
//       target: null,
//       DragRotateAndZoom:true,
//       layers: [
//         new OlLayerTile({
//           source: new OlSourceOSM()
//         })
//       ],
//       view: new OlView({
//         center: this.state.center,
//         zoom: this.state.zoom
//       })
//     });
//   }

//   updateMap() {
//     this.olmap.getView().setCenter(this.state.center);
//     this.olmap.getView().setZoom(this.state.zoom);
//   }

//   componentDidMount() {
//     this.olmap.setTarget("map");

//     // Listen to map changes
    
//     this.olmap.on("moveend", () => {
//       let center = this.olmap.getView().getCenter();
//       let zoom = this.olmap.getView().getZoom();
//       this.setState({ center, zoom });
//     });
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     let center = this.olmap.getView().getCenter();
//     let zoom = this.olmap.getView().getZoom();
//     if (center === nextState.center && zoom === nextState.zoom) return false;
//     return true;
//   }

//   userAction() {
//     this.setState({ center: [546000, 6868000], zoom: 5 });
//   }

//   render() {
//     this.updateMap(); // Update map on render?
//     return (
//       <div id="map" style={{ width: "100%", height: "100%" }}>
//       </div>
//     );
//   }
// }

// export default PublicMap;
    
        
    

// import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
 
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100%', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyAN1Iob6BhUvuOmBq4ucOtHZSScFHdLs9I' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="My Marker"
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
 
// export default SimpleMap;