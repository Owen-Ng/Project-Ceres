import React, { Component } from 'react';
import "./tribe.css";
import FamilyMember from "./FamilyMember/family-member.component"

import { v4 as uuidv4 } from 'uuid';

export default class Tribe extends Component {
  constructor(props) {
    super(props);

    // This data will all be pulled from a server
    this.state = {
      users: [],
      tribeList: {},
      currentFamily: "",
      currentTribe: "",
    }

    this.renderLists = this.renderLists.bind(this);
    this.renderCurrentList = this.renderCurrentList.bind(this);
    this.selectList = this.selectList.bind(this);
  }

  async componentDidMount() {
    try {
        const response = await fetch("/users", {
            method: "GET",
            crossDomain: true,
            credentials: "include",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
        });
        if (response.status < 400) {
            const user = await response.json();
            if (!user) {
                return;
            }
            this.setState({ user });
        }
    } catch (err) {
        console.log(err);
    }

    try {
      if (!this.state.user) {
        return;
      }
      if (!this.state.user.familyID) {
          ;
      } else {
          const fid = this.state.user.familyID;
          const url = `/family/users/${fid}`
          const request = new Request(url,{
              method:"GET",
              headers:{
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
              }
          });
          const response = await fetch(request, {});
          const json = await response.json();
          const users = await json.users;
          const familyName = await json.familyName;

          const names = [];

          users.map((user) => {
            names.push(user.name)
          })
          
          this.setState({ users: names, currentFamily: familyName });
      }

      if (!this.state.user) {
        return;
      }
      if (!this.state.user.familyID) {
          ;
      } else {
          const fid = this.state.user.familyID;
          const url = `/family/${fid}`
          const request = new Request(url,{
              method:"GET",
              headers:{
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
              }
          });
          const response = await fetch(request, {});
          const json = await response.json();
          const tribeID = await json.tribes;
          const tribes = { };
          
          tribeID.map(async (tid) => {
            const url = `/tribe/families/${tid}`
            const request = new Request(url,{
              method:"GET",
              headers:{
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
              }
            });
            const response = await fetch(request, {});
            const json = await response.json();
            const tribeName = await json.tribeName;
            const familyArray = await json.family;
            const familyNames = [];

            familyArray.map((family) => {
              familyNames.push(family.familyName)
            })

            const tribeObj = {
              [tribeName]: familyNames
            }

            const returned = Object.assign(tribes, tribeObj)
            this.setState({ tribeList: returned })
          })
          
      }

    } catch (err) {
      console.log(err);
    }
  }

  // Lists the members of the currently selected family
  //Will require server call to get names of family members
  renderCurrentList() {
    const listObject = this.state.users
    const listKeys = Object.keys(listObject).sort()

    return listKeys.map(key =>

      <FamilyMember
        key={uuidv4()}
        name={listObject[key]}
      />

    )
  }

  // creates the list of Tribes and which families they contain
  //Will require server call to get the tribes and whic hfamilies they contain
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

  /* This function sends the name of the tribe button that was pushed to the 
  grocery list page in order to display the correct lists based on which tribe
  was selected */
  selectList(tribe) {
    this.props.history.push({pathname: `/grocerylists`, currentTribe: tribe})
  }

  // Helper function, creates the list of families in each tribe
  // Will require server call
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

  render() {
    return (
      <div className="FamilyTribe container">
        <div className="row">
          <div className="Family-list col-lg">

            <h3>Family: { this.state.currentFamily }</h3>
            { this.renderCurrentList() }
          </div>
          <div  className="Tribe-list col-sm">
            <h3>Tribes</h3>
            { this.renderLists() }
          </div>
        </div>
      </div>
    )
  }
}