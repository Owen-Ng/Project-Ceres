import React, { Component } from 'react';
import "./tribe.css";
import FamilyAddMemberForm from "./FamilyAddMemberForm/family-add-member-form.component";
import FamilyMember from "./FamilyMember/family-member.component"

import { v4 as uuidv4 } from 'uuid';

export default class Tribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      membersLists: {   "Family 1" : ["Bob", "Karen" ],
                        "Family 2" : ["James", "Debbie"],
                        "Family 3" : ["Scott", "Barry"], 
                        "Family 4" : ["Doug"],
                        "Family 5" : ["Christine", "Valerie"], 
                        "Family 6" : ["Stephen", "Joanne", "Kia"]},
      tribeList: {  "Tribe 1" : ["Family 1", "Family 2", "Family 5"],
                    "Tribe 2" : ["Family 2", "Family 3"],
                    "Tribe 3" : ["Family 4", "Family 5"]},
      unassigned: ["Jake", "Betty", "Alice"],
      currentFamily: "Family 1",
      currentUserLevel: "user"
    }
    this.addMember = this.addMember.bind(this);
    this.renderLists = this.renderLists.bind(this)
    this.renderCurrentList = this.renderCurrentList.bind(this)
    this.changeFamily = this.changeFamily.bind(this)
  }

  addMember(newMember) {
    const currentFamily = this.state.currentFamily
    const unassigned = this.state.unassigned
    const unassignedLength = unassigned.length
    let familyList = this.state.membersLists[currentFamily]

    for (let i = 0; i < unassigned.length; i++) {
      if (newMember.newMemberID === unassigned[i]) {
        familyList.push(newMember.newMemberID)
        unassigned.splice(i, 1)
        this.setState({memberLists : familyList,
                        unassigned : unassigned })
      }
    }

    if (this.state.unassigned.length === unassignedLength) {
      console.log("member not found")
    }
  }

  renderCurrentList() {
    const currentList = this.state.currentFamily
    const listObject = this.state.membersLists[currentList]
    const listKeys = Object.keys(listObject).sort()

    return listKeys.map(key =>

      <FamilyMember
        key={uuidv4()}
        name={listObject[key]}
      />

    )
  }

  renderLists() {
    const tribeList = this.state.tribeList
    const currentFamily = this.state.currentFamily
    const lists = Object.keys(tribeList)
    let newLists = Object.keys(tribeList)

    for (let i = 0; i < lists.length; i++) {
      let inList = false

      for (let j = 0; j < tribeList[lists[i]].length; j++) {
        if (currentFamily === tribeList[lists[i]][j]) {
          inList = true
        }
      }

      if (!inList) {
        let idx = newLists.indexOf(lists[i])
        newLists.splice(idx,1)
      }
    }

    return newLists.map(list =>
      <div>
        <button
        name={list}
        onClick={this.selectList}
        className="TribeList-list-change-btn">{list}</button>
        <ul>
          {this.makeList(tribeList[list])}
        </ul>
      </div>)
  }

  makeList(listObject) {
    const listKeys = Object.keys(listObject).sort()
    return listKeys.map(key => 
      <li>
        <FamilyMember 
          key={uuidv4()}
          name={listObject[key]}
        />
      </li>
    )
  }

  changeFamily() {
    const family = this.state.currentFamily
    const familyList = this.state.membersLists
    const lists = Object.keys(familyList)
    
    let i = 0
    
    while (i < lists.length) {
      if (lists[i] === family) {
        break
      }
      i++
    }

    i++

    if (i === lists.length) {
      i = 0
    }

    this.setState({currentFamily : lists[i]})
  }

  setUser(e) {
    this.setState({currentUserLevel: e.target.value})
  }

  render() {
    return (
      <div className="FamilyTribe container">
        <div onChange={this.setUser.bind(this)}>
          <input type="radio" value="user" name="userType" /> User
          <br />
          <input type="radio" value="familyAdmin" name="userType" /> Family Admin
          <br />
          <input type="radio" value="tribeAdmin" name="userType" /> Tribe Admin
        </div>
        <button className="btn btn-primary" onClick={this.changeFamily}>Change Family</button>
        <div className="row">
          <div className="Family-list col-lg">

            <h3>Family</h3>
            {this.renderCurrentList()}
            <FamilyAddMemberForm addMember={this.addMember}/>
          </div>
          <div  className="Tribe-list col-sm">
            <h3>Tribe</h3>
            { this.renderLists()}
          </div>
        </div>
      </div>
    )
  }
}