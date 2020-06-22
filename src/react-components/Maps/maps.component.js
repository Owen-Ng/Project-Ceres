import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./map.css";
import Map from './Map.item/Mapapi'
import {IconButton} from "@material-ui/core";
export default class Maps extends Component {
  constructor(props) {
    super(props)

    this.state = {
        currentstate:{
          Store:"",
          Address:"",
          Hours:"",
          Wait_time:"",
        },
       
        Lists:{ "List 1" : {Store:"Winners", Address:"MISSI RD", Hours:"8am-9pm", Wait_time:"20min"},
        "List 2": {Store:"Loblaws", Address:"Port RD", Hours:"8am-9pm", Wait_time:"20min"},
        "List 3": {Store:"Plavc", Address:"A ro RD", Hours:"8am-9pm", Wait_time:"20min"}},
        City:{mississauga:[43.587684, -79.646186,],etobicoke:[43.618470, -79.514554],
           toronto:[43.651717, -79.383545], scarborough:[43.774614, -79.259978],
          york: [43.694012, -79.450578]}
        ,citystate:"",
        currentcity:"toronto",
      }
    this.change = this.change.bind(this);
    this.getdata= this.getdata.bind(this);
    this.changecity = this.changecity.bind(this);
    this.Keypress = this.Keypress.bind(this);
  }
  getdata(info, address, hour, wait){
    const something ={Store:info,Address:address,Hours:hour,
      Wait_time:wait,
    } 
    this.setState({currentstate:something})
  }
  change(item){
    const something= this.state.Lists[item];

    this.setState({currentstate:something});
  }
  changecity(event){
    console.log(event)
    const target = event.target;
    const value = target.value;
    this.setState({citystate: value});
  }
  Keypress(event){
    const key = event.Keycode || event.which;
    
    console.log(Object.keys(this.state.City).length)
   
          if (key === 13){
            if(this.state.citystate in this.state.City){
            this.setState(({citystate}) => ({
              citystate: "",
              currentcity: citystate,
            
            
          }));
          
          console.log(this.state)
          }
          else{
            alert("Does not exist")
          
        }
   

  }
    

  }
  
  render() {
    return (
      <div class='container-xl' style={{ alignContent: 'center', justifyContent: 'center', }}>
        <div class="row">
          <div class="col-lg-9 border border-dark" style={{height:500}}>
            <Map name = {this.state.currentcity}  city = {this.state.City[this.state.currentcity]} senddata= {this.getdata}/>
            {/* <IconButton class ="b1"color='black' onClick={()=>this.change("List 1")}  >♥</IconButton>
            <IconButton class ="b2"color='black' onClick={()=>this.change("List 2")}>♥</IconButton>
            <IconButton class ="b3"color='black' onClick={()=>this.change("List 3")}>♥</IconButton> */}
          </div>
          <div class="p-0 m-0 col-3 border border-dark" >
            <div class="mapborderbottom" >
              {/* <h2 class="header_map">Ceres</h2> */}
              
              <input name = "currentcity" 
              value = {this.state.citystate} 
              onChange={this.changecity} 
              onKeyUp={this.Keypress} 
              type="text" 
              class="m-2 border-dark" placeholder="Enter City" 
              style={{width:"94%",textAlign: "center"}}/>
            </div>
         
            <div class= "infor">
            <p>Store Info: <strong>{this.state.currentstate.Store}</strong> </p>
            <p>Address: <strong>{this.state.currentstate.Address}</strong> </p>
            <p>Hours: <strong>{this.state.currentstate.Hours}</strong> </p>
            <p>Wait time: <strong>{this.state.currentstate.Wait_time}</strong> </p>
            </div>
            <div class="bottomtext">
              <span> Report how long your visit took</span>
              <input id= "report" type= "text" style={{width:"90%", height:100, fontSize:50, textAlign:"center"}}></input>
            </div>
            
            
          </div>
   
            
          </div>
        
        </div>
    )
  }
}