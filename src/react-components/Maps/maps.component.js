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
    }
    this.change = this.change.bind(this);
  }
  change(item){
    const something= this.state.Lists[item];

    this.setState({currentstate:something});
  }
  render() {
    return (
      <div class='container-xl' style={{ alignContent: 'center', justifyContent: 'center', }}>
        <div class="row">
          <div class="col-lg-9 border border-dark" style={{height:500}}>
            <Map/>
            <IconButton class ="b1"color='black' onClick={()=>this.change("List 1")}  >♥</IconButton>
            <IconButton class ="b2"color='black' onClick={()=>this.change("List 2")}>♥</IconButton>
            <IconButton class ="b3"color='black' onClick={()=>this.change("List 3")}>♥</IconButton>
          </div>
          <div class="p-0 m-0 col-3 border border-dark" >
            <div class="mapborderbottom" >
              <input id="address" type="text" class="m-2 border-dark" placeholder="Enter address here" style={{width:"94%",textAlign: "center"}}/>
            </div>
         
            <div class= "infor">
            <p>Store Info:{this.state.currentstate.Store} </p>
            <p>Address:{this.state.currentstate.Address} </p>
            <p>Hours:{this.state.currentstate.Hours} </p>
            <p>Wait time:{this.state.currentstate.Wait_time} </p>
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