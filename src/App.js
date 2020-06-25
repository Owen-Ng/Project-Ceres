import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./react-components/Navbar/navbar.component"
import Home from "./react-components/Home/home.component"
import Login from "./react-components/Login/Login.component"
import Maps from "./react-components/Maps/maps.component"
import Tribe from "./react-components/Tribe/tribe.component"
import GroceryList from "./react-components/GroceryList/grocery-list.component"
import AdminSettings from "./react-components/AdminSettings/admin-settings.component"
import Profile from "./react-components/Profile/profile.component"

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       permissions: "user",
       loggedIn: false
    }
    this.setPermissions = this.setPermissions.bind(this)
  }
  
  setPermissions(permissionString){
    if(permissionString === "user"){
      this.setState({ permissions: "user", loggedIn: true})
      
    }
    else if (permissionString === "admin"){
      this.setState({ permissions: "admin", loggedIn: true})
    }
    else{
      alert("Unable to establish permissions")
    }
  }
  render(){
    return (
      <Router>
        <Navbar permissions={this.state.permissions} loggedIn={this.state.loggedIn}/>
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


