import React, { Component } from 'react';
import "./tribe.css";
import FamilyAddMemberForm from "./FamilyAddMemberForm/family-add-member-form.component";

export default class Tribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      family: ["Bob", "Karen" ],
    }
    this.addMember = this.addMember.bind(this);
  }

  addMember(newMember) {
    let familyList = this.state.family
    familyList.push(newMember.newMemberID)
    this.setState({family : familyList})
  }

  render() {
    return (
      <div className="FamilyTribe container">
        <div className="row">
          <div className="Family-list col-lg">

            <h3>Family</h3>
            <FamilyAddMemberForm addMember={this.addMember}/>
          </div>
          <div  className="Tribe-list col-sm">
            <h3>Tribe</h3>
          </div>
        </div>
      </div>
    )
  }
}