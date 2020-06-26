import React, { Component } from 'react';
import "./profile.css"
export default class Profile extends Component {
  render() {
    return (
      <div className = "box">
       <input type= "text" placeholder="Change Email" style={{  textAlign:"left"}}></input>
       <br></br>
       <input type= "text" placeholder="Change Password" style={{  textAlign:"left"}}></input>


      </div>
    )
  }
}