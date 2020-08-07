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
            /* 
        Alot of this data will be imported from the database in phase 2 
        Namely membersLists, tribeList, unassigned, and storeList.

        As updates happen to the above list we will have to call the database again to update them
        */
            membersLists: {
                UofT: ["Bob", "Karen"],
                Laurier: ["James", "Debbie"],
                McMaster: ["Scott", "Barry"],
                Brock: ["Doug"],
                York: ["Christine", "Valerie"],
                Guelph: ["Stephen", "Joanne", "Kia"],
            },
            tribeList: {
                Toronto: ["UofT", "Laurier", "York"],
                Hamilton: ["Laurier", "McMaster"],
                Scarbourgh: ["Brock", "York"],
            },
            unassigned: ["Jake", "Betty", "Alice"],
            storeList: {
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
        this.showOnPanel = this.showOnPanel.bind(this);
        this.deleteObj = this.deleteObj.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    async componentDidMount() {}

    /*
    Recieves the item that needs to be displayed from AdminResults and displays it.
    */

    showOnPanel(selectedItem, displayType) {
        if (displayType === "family") {
            const family = this.state.membersLists[selectedItem];
            this.setState({
                selectedItem: selectedItem,
                displayType: "family",
                selectedObj: family,
            });
        } else if (displayType === "store") {
            const store = this.state.storeList[selectedItem];
            this.setState({
                selectedItem: selectedItem,
                displayType: "store",
                selectedObj: store,
            });
        } else if (displayType === "tribe") {
            const tribe = this.state.tribeList[selectedItem];
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

        if (displayType === "family") {
            updatedList = this.state.membersLists;
            delete updatedList[selectedItem];
            const newFamilyList = Object.keys(this.state.membersLists);
            this.setState({
                selectedItem: "",
                selectedObj: [],
                familyList: newFamilyList,
                membersLists: updatedList,
            });
        } else if (displayType === "store") {
            updatedList = this.state.storeList;
            delete updatedList[selectedItem];
            this.setState({
                selectedItem: "",
                selectedObj: [],
                storeList: updatedList,
            });
        } else if (displayType === "tribe") {
            updatedList = this.state.tribeList;
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
        } else if (dataType === " store") {
            this.setState({ storeList: newData });
        } else if (dataType === " tribe") {
            this.setState({ tribeList: newData });
        }
    }

    render() {
        const adminSettings = (
            <div className="container-lg">
                <div className="row">
                    <div className="col-sm search">
                        <AdminSearch
                            familyList={this.state.membersLists}
                            storeList={this.state.storeList}
                            tribeList={this.state.tribeList}
                            showPanel={this.showOnPanel}
                        />
                    </div>
                    <div className="col-sm data">
                        <AdminData
                            familyList={this.state.membersLists}
                            storeList={this.state.storeList}
                            tribeList={this.state.tribeList}
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
