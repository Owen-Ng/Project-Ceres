import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./react-components/Navbar/navbar.component"
import Home from "./react-components/Home/home.component"
import Maps from "./react-components/Maps/maps.component"
import Tribe from "./react-components/Tribe/tribe.component"
import YourList from "./react-components/YourLists/your-lists.component"
import AdminSettings from "./react-components/AdminSettings/admin-settings.component"
import Profile from "./react-components/Profile/profile.component"

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={Home} />
      <br/>
      <Route path="/map" component={Maps} />
      <Route path="/tribe" component={Tribe} />
      <Route path="/lists" component={YourList} />
      <br/>
      <Route path="/admin" component={AdminSettings} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
}

export default App;
