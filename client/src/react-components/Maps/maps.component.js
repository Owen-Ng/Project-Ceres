import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./map.css";
import Map from './Map.item/Mapapi'
import { addtime } from '../../actions/maplist'
const log = console.log
export default class Maps extends Component {
  constructor(props) {
    super(props)

    // This data will all be pulled from a server
    this.state = {
        currentstate:{
          id: "",
          Store:"",
          Address:"",
          Hours:"",
          Wait_time:"",
        },
       
      
        City:{etobicoke:[43.618470, -79.514554],}
        ,citystate:"",
        currentcity:"etobicoke",
        timesubmitted:null,
        toggle: false,

      }
 
    this.getdata= this.getdata.bind(this);
    this.changecity = this.changecity.bind(this);
    this.Keypress = this.Keypress.bind(this);
    this.changetimesubmitted = this.changetimesubmitted.bind(this);
    this.timesubmit = this.timesubmit.bind(this);
    // this.addtime = addtime.bind(this);
  }
  getdata(id,info, address, hour, wait){
    const something ={id:id,Store:info,Address:address,Hours:hour,
      Wait_time:wait,
    } 
    this.setState({currentstate:something})
  }
  changetimesubmitted(event){
    
    
    const target = event.target;
    const value = target.value;
    this.setState({timesubmitted: value});
  }
  changecity(event){
    
    const target = event.target;
    const value = target.value;
    this.setState({citystate: value});
  }
  timesubmit(event){
    
    const key = event.Keycode || event.which;
    if (key === 13){
      if(!isNaN(this.state.timesubmitted) && this.state.currentstate.id !== ""){
        
          addtime(this.state.timesubmitted, this.state.currentstate.id);
          
        setTimeout(function () {
          this.setState({toggle:!this.state.toggle});
          this.setState({ timesubmitted: "" })
        }.bind(this), 1000)
      }
      else {
        if (this.state.currentstate.id === "") {
          this.setState({ timesubmitted: "Please select a store" });
          setTimeout(function () {
            this.setState({ timesubmitted: "" })
          }.bind(this), 1000)
        } else {
          this.setState({ timesubmitted: "Input should be a number" });
          setTimeout(function () {
            this.setState({ timesubmitted: "" })
          }.bind(this), 1000)
        }
      
      //alert("Does not exist")
    }
    
  }

  }
  componentDidMount(){
    const url = "/City";
    fetch(url, {
      method: "GET"
    }).then(res => {
      if (res.status === 200) {
        return res.json();

      } else {
        log("Could not get data");
      }
    }).then(function (json) {
      

      this.setState({ City: json});
      // console.log(this.state);

    }.bind(this)).catch(error => {
      log(error)
    })
  }
  Keypress(event){
    const key = event.Keycode || event.which;
    
          if (key === 13){
            
            if(this.state.citystate.toLowerCase() in this.state.City){
              
              
              this.setState(({citystate}) => ({
              citystate: "",
              currentcity: citystate.toLowerCase(),
            
            
            }));
    
          }
          else{
            this.setState({citystate: "City does not exist"});
            setTimeout(function(){
              this.setState({citystate:""})
            }.bind(this),1000)
            //alert("Does not exist")
          }
          
        }
   

  }

  
  
  render() {
    return (
      <div className='mapcenter container-xl' >
        <div className="row">
          <div className="mapcolor p-1 m-0 col-lg-9 border border-dark">
            <Map name = {this.state.currentcity} toggle={this.state.toggle} city = {this.state.City[this.state.currentcity]} senddata= {this.getdata}/>
          </div>
          <div className="backcolor p-0 m-0 col-3 border border-dark " >
            <div className="mapborderbottom" >
              <input name = "currentcity" 
              value = {this.state.citystate} 
              onChange={this.changecity} 
              onKeyUp={this.Keypress} 
              type="text" 
              className="inputext m-2 border-dark" placeholder="Enter City" 
     />
             
            </div>
            <div className= "infor">
            <p>Store Info: <strong>{this.state.currentstate.Store}</strong> </p>
            <p>Address: <strong>{this.state.currentstate.Address}</strong> </p>
            <p>Hours: <strong>{this.state.currentstate.Hours}</strong> </p>
            <p>Wait time: <strong>{this.state.currentstate.Wait_time}</strong> </p>
            </div>
            {this.props.user?this.props.user.familyAdmin?<div className="bottomtext">
              <span> Report how long your visit took</span>
              <input name= "report" value = {this.state.timesubmitted} onChange={this.changetimesubmitted}
               onKeyUp={this.timesubmit} type= "text" className="waitTime" placeholder="Enter time taken"></input>
            </div>: <div></div>:<div></div>}
          </div>
          </div>
        </div>
    )
  }
}