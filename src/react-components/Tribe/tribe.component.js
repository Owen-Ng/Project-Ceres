import React, { Component } from 'react';
import "./tribe.css";
import FamilyMember from "./FamilyMember/family-member.component"

import { v4 as uuidv4 } from 'uuid';

export default class Tribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      membersLists: {   "Family 1" : ["Anna", "Bob" ],
                        "Family 2" : ["James", "Debbie"],
                        "Family 3" : ["Scott", "Barry"], 
                        "Family 4" : ["Doug"],
                        "Family 5" : ["Christine", "Valerie"], 
                        "Family 6" : ["Stephen", "Joanne", "Kia"],
                        "Family 7" : ["TribeAdmin", "Admin", "User"]},
      tribeList: {  "Tribe 1" : ["Family 1", "Family 2", "Family 5"],
                    "Tribe 2" : ["Family 2", "Family 3"],
                    "Tribe 3" : ["Family 4", "Family 5"],
                    "Tribe 4" : ["Family 4", "Family 7"]},
      unassigned: ["Jake", "Betty", "Alice"],
      currentFamily: "Family 7",
      currentTribe: "",
    }

    this.renderLists = this.renderLists.bind(this);
    this.renderCurrentList = this.renderCurrentList.bind(this);
    this.changeFamily = this.changeFamily.bind(this);
    this.selectList = this.selectList.bind(this);
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
      <div key={uuidv4()}>
        <button
        name={list}
        onClick={() => this.selectList(list)}
        className="TribeList-list-change-btn">{list}</button>
        <ul>
          {this.makeList(tribeList[list])}
        </ul>
      </div>)
  }

  selectList(tribe) {
    this.props.history.push({pathname: `/grocerylists`, currentTribe: tribe})
  }

  makeList(listObject) {
    const listKeys = Object.keys(listObject).sort()
    return listKeys.map(key => 
      <li key={uuidv4()}>
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

  render() {
    return (
      <div className="FamilyTribe container">
        
        <button className="btn btn-primary" onClick={this.changeFamily}>Change Family</button>
        <div className="row">
          <div className="Family-list col-lg">

            <h3>{this.state.currentFamily}</h3>
            {this.renderCurrentList()}
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