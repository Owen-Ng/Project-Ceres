import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "jquery/dist/jquery.min"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min"

import Navbar from "./react-components/Navbar/navbar.component"
//import Home from "./react-components/Home/home.component"
import Login from "./react-components/Login/login.component.js"
import Maps from "./react-components/Maps/maps.component"
import Tribe from "./react-components/Tribe/tribe.component"
import GroceryList from "./react-components/GroceryList/grocery-list.component"
import AdminSettings from "./react-components/AdminSettings/admin-settings.component"
import Profile from "./react-components/Profile/profile.component"

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isAdmin: false,
       loggedIn: false,
       username: ""
    }
    this.setPermissions = this.setPermissions.bind(this)
    this.logout = this.logout.bind(this)
  }
  
  setPermissions(permissionString){
    if(permissionString === "user"){
      this.setState({ isAdmin: false, loggedIn: true, username: "user"})
      return <Redirect to="/map"/>
      
    }
    else if (permissionString === "admin"){
      this.setState({ isAdmin: true, loggedIn: true, username: "admin"})
      return <Redirect to="/map"/>
    }
    else{
      alert("Unable to establish permissions")
    }
  }


  logout(){
    this.setState({ isAdmin: false, loggedIn: false, username: ""})
    //window.location.reload()
    return <Redirect to="/map"/>
  } 

  render(){
    return (
      <Router>
        {this.state.loggedIn ? <Redirect to="/map"/> : ""}
        <Navbar isAdmin={this.state.isAdmin} loggedIn={this.state.loggedIn} logout={this.logout}/>
        <br/>
        <Route path="/" exact component={Maps} />
        <Route path="/login" exact render={() => <Login 
                                                  setPermissions={this.setPermissions}
                                                  loggedIn={this.state.loggedIn}
                                                  />} />
        
        <Route path="/map" exact component={Maps} />
        <Route path="/tribe" exact component={Tribe} />
        <Route path="/grocerylists" exact component={GroceryList} />
        
        <Route path="/admin" exact component={AdminSettings}/>
        <Route path="/profile" exact component={Profile} />
        
      </Router>
    );
  }
  
}

