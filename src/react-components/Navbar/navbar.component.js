import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Project Ceres</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/map" className="nav-link">Map</Link>
            </li>
            <li className="navbar-item">
              <Link to="/tribe" className="nav-link">Tribe</Link>
            </li>
            <li className="navbar-item">
              <Link to="/grocerylists" className="nav-link">Grocery Lists</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin" className="nav-link">Admin Settings</Link>
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}