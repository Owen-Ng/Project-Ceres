/*
This page is the main page for this feature. Everything in AdminSettings is called from within here 
or a child. All server calls will be done from the page as it is the first and last to view any changes made thus
it sends and recieves the most up to date information.
*/

import React, { Component } from "react";
import "./admin-settings.css";
import AdminSearch from "./AdminSearch/admin-search.component";
import AdminPanel from "./AdminPanel/admin-panel.component";
import AdminData from "./AdminDataManager/admin-data.component";
import Unauthorized from "../Errors/Unauthorized";
export default class AdminSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: {},
            allFamilies: {},
            allStores: {},
            allTribes: {},
            membersLists: {},
            tribeLists: {},
            membersDUMMYLists: {
                UofT: ["Bob", "Karen"],
                Laurier: ["James", "Debbie"],
                McMaster: ["Scott", "Barry"],
                Brock: ["Doug"],
                York: ["Christine", "Valerie"],
                Guelph: ["Stephen", "Joanne", "Kia"],
            },
            tribeDUMMYList: {
                Toronto: ["UofT", "Laurier", "York"],
                Hamilton: ["Laurier", "McMaster"],
                Scarbourgh: ["Brock", "York"],
            },
            unassigned: { Jake: {}, Betty: {}, Alice: {} },
            storeList: {
                "444 Yonge St, Toronto": { name: "Metro", "line-size": 10 },
                "531 Adelaide St W, Toronto": {
                    name: "Walmart",
                    "line-size": 32,
                },
            },
            storeDUMMYList: {
                "444 Yonge St, Toronto": { name: "Metro", "line-size": 10 },
                "531 Adelaide St W, Toronto": {
                    name: "Walmart",
                    "line-size": 32,
                },
            },
            displayType: "",
            selectedItem: "",
            selectedObj: {},
        };
        this.parseUserData = this.parseUserData.bind(this);
        this.parseFamilyData = this.parseFamilyData.bind(this);
        this.parseTribeData = this.parseTribeData.bind(this);
        this.showOnPanel = this.showOnPanel.bind(this);
        this.deleteObj = this.deleteObj.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    async componentDidMount() {
        if (this.props.user !== null) {
            try {
                //Getting all users
                const response = await fetch(
                    `http://localhost:5000/users/all`,
                    {
                        method: "GET",
                        crossDomain: true,
                        credentials: "include",
                        redirect: "follow",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        referrerPolicy: "no-referrer",
                    }
                );
                if (response.status < 400) {
                    const allUsers = await response.json();
                    this.setState({ allUsers });
                    this.parseUserData();
                    /*
                    
                    */
                }
            } catch (err) {
                console.log(err);
            }
            //Getting all families
            try {
                const response = await fetch(
                    `http://localhost:5000/family/all`,
                    {
                        method: "GET",
                        crossDomain: true,
                        credentials: "include",
                        redirect: "follow",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        referrerPolicy: "no-referrer",
                    }
                );
                if (response.status < 400) {
                    const allFamilies = await response.json();
                    this.setState({ allFamilies });

                    this.parseFamilyData();
                    /*
                    
                    */
                }
            } catch (err) {
                console.log(err);
            }
            // Getting all tribes
            try {
                const response = await fetch(
                    `http://localhost:5000/tribe/all`,
                    {
                        method: "GET",
                        crossDomain: true,
                        credentials: "include",
                        redirect: "follow",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        referrerPolicy: "no-referrer",
                    }
                );
                if (response.status < 400) {
                    const allTribes = await response.json();
                    this.setState({ allTribes });
                    this.parseTribeData();
                    /*
                    
                    */
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    parseUserData() {
        const users = this.state.allUsers;
        const newUserData = {};
        for (let key in users) {
            //this is how we'll adjust if the schema changes
            //newUserData[users[key][username]] = users[key][username];
            let thisUserName = users[key]["username"];
            newUserData[thisUserName] = users[key];
        }

        this.setState({ allUsers: newUserData });
    }
    parseFamilyData() {
        const families = this.state.allFamilies;
        const newUserData = {};
        for (let key in families) {
            //this is how we'll adjust if the schema changes
            //newUserData[users[key][username]] = users[key][username];
            let thisFamilyName = families[key]["familyName"];
            newUserData[thisFamilyName] = families[key];
        }

        this.setState({ allFamilies: newUserData });
    }
    parseStoreData() {}
    parseTribeData() {
        const tribes = this.state.allTribes;
        const newUserData = {};
        for (let key in tribes) {
            //this is how we'll adjust if the schema changes
            //newUserData[users[key][username]] = users[key][username];
            let thisTribeName = tribes[key]["tribeName"];
            newUserData[thisTribeName] = tribes[key];
        }

        this.setState({ allTribes: newUserData });
    }

    /*
    Recieves the item that needs to be displayed from AdminResults and displays it.
    */

    showOnPanel(selectedItem, displayType) {
        if (displayType === "family") {
            const family = this.state.allFamilies[selectedItem];
            this.setState({
                selectedItem: selectedItem,
                displayType: "family",
                selectedObj: family,
            });
        } else if (displayType === "user") {
            const user = this.state.allUsers[selectedItem];

            this.setState({
                selectedItem: selectedItem,
                displayType: "user",
                selectedObj: user,
            });
        } else if (displayType === "store") {
            const store = this.state.allStores[selectedItem];
            this.setState({
                selectedItem: selectedItem,
                displayType: "store",
                selectedObj: store,
            });
        } else if (displayType === "tribe") {
            const tribe = this.state.allTribes[selectedItem];
            this.setState({
                selectedItem: selectedItem,
                displayType: "tribe",
                selectedObj: tribe,
            });
        }
    }
    /* 
    Goes into the selected list and removes the instance. Updates the state with the new list. This function
    will call the server to handover the new update.
    */
    deleteObj(selectedItem, displayType) {
        let updatedList;
        if (displayType === "user") {
            updatedList = this.state.allUsers;
            delete updatedList[selectedItem];
            const allUsers = Object.keys(this.state.allUsers);
            this.setState({
                selectedItem: "",
                selectedObj: [],
                allUsers,
            });
        } else if (displayType === "family") {
            updatedList = this.state.allFamilies;
            delete updatedList[selectedItem];
            const newFamilyList = Object.keys(this.state.membersLists);
            this.setState({
                selectedItem: "",
                selectedObj: [],
                familyList: newFamilyList,
                membersLists: updatedList,
            });
        } else if (displayType === "store") {
            updatedList = this.state.allStores;
            delete updatedList[selectedItem];
            this.setState({
                selectedItem: "",
                selectedObj: [],
                storeList: updatedList,
            });
        } else if (displayType === "tribe") {
            updatedList = this.state.allTribes;
            delete updatedList[selectedItem];
            this.setState({
                selectedItem: "",
                selectedObj: [],
                tribeList: updatedList,
            });
        } else {
            alert("Something went wrong");
        }
    }
    /* 
    Simply gets a new list and then updates the state. This function
    will call the server to handover the new update.
    */
    addNewData(newData, dataType) {
        if (dataType === "family") {
            this.setState({ membersLists: newData });
        } else if (dataType === "user") {
            this.setState({ allUsers: newData });
        } else if (dataType === "store") {
            this.setState({ storeList: newData });
        } else if (dataType === "tribe") {
            this.setState({ tribeList: newData });
        }
    }

    render() {
        const adminSettings = (
            <div className="container-lg">
                <div className="row">
                    <div className="col-sm search">
                        <AdminSearch
                            allUsers={this.state.allUsers}
                            allFamilies={this.state.allFamilies}
                            allStores={this.state.allStores}
                            allTribes={this.state.allTribes}
                            showPanel={this.showOnPanel}
                        />
                    </div>
                    <div className="col-sm data">
                        <AdminData
                            allUsers={this.state.allUsers}
                            familyList={this.state.allFamilies}
                            storeList={this.state.allStores}
                            tribeList={this.state.allTribes}
                            addNewData={this.addNewData}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm panel">
                        <AdminPanel
                            selectedItem={this.state.selectedItem}
                            selectedObj={this.state.selectedObj}
                            displayType={this.state.displayType}
                            deleteObj={this.deleteObj}
                        />
                    </div>
                </div>
            </div>
        );
        return (
            <div>{this.props.isAdmin ? adminSettings : <Unauthorized />}</div>
        );
    }
}
