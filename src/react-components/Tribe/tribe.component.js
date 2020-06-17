import React, { Component } from 'react';
import "./tribe.css"

export default class Tribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
      <div className="FamilyTribe container">
        <div className="row">
          <div className="Family-list col-lg">

            <h3>Family</h3>
          </div>
          <div  className="Tribe-list col-sm">
            <h3>Tribe</h3>
          </div>
        </div>
      </div>
    )
  }
}