import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer ,withLeaflet, Tooltip} from "react-leaflet";
import { Icon } from "leaflet";
import './Mapapi.css'
import Search from "react-leaflet-search/lib/Search-v1";
import * as groceries from '../data/groceries.json'
const someicon = new Icon ({iconUrl: "/cart.svg", iconSize:25}); 
const active = new Icon({iconUrl:"/basket", iconSize: 20})
export default class PublicMap extends Component {
  
  state=null
  data(map){
    
    this.props.senddata(map.properties.NAME, map.properties.ADDRESS, map.properties.OPEN, map.properties.WAIT)
  }
  selected(map){
    return(
    <Marker key = {map.properties.SHOP_ID} position={[
      map.geometry.coordinates[1], 
      map.geometry.coordinates[0]
     
    ]}
    icon= {active}
    />
    )
  }
 
  render(){
    const SearchComponent = withLeaflet(Search);
      return(
        <div>
          {/* Map api from react leaflet https://react-leaflet.js.org/ */}
          <Map center={[this.props.city[0], this.props.city[1]]} zoom={12}>
                <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />

          {groceries.features.map(map =>(
            <Marker key = {map.properties.SHOP_ID} position={[
              map.geometry.coordinates[1], 
              map.geometry.coordinates[0]
            
            ]}
            
       
            onClick={()=>{this.setState(map); this.data(map);this.selected(map);
            }}
            icon = {someicon}>

            <Tooltip className='tooltip' direction='center' offset={[-35, 0]} opacity={1} permanent>
              <span>{map.properties.WAIT}</span>
            </Tooltip>
          </Marker>
            )
            )
          }
          {this.state && (
            <Popup
            key = {this.state.properties.SHOP_ID}
              position={[
                this.state.geometry.coordinates[1],
                this.state.geometry.coordinates[0]
              ]}
              closeButton ={false}
              offset={[1,0]}
              onClose={() => {
                this.setState(null);
              }}
            >
            <div>
              <h6>You are here</h6>
            </div>
          </Popup>
          
        )}
        </Map>

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