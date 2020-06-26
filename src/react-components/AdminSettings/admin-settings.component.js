import React, { Component } from 'react';
import "./admin-settings.css"
import AdminSearch from './AdminSearch/admin-search.component'
import AdminPanel from "./AdminPanel/admin-panel.component"
import AdminData from './AdminDataManager/admin-data.component';
export default class AdminSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
        isAdmin: true, // TODO get properities of who is signed in from App() 
        userList: {"Bob": {"familyName": "UofT"}, "John": {"familyName": "Waterloo"}},
        storeList : {"444 Yonge St, Toronto": {"name":"Metro", "line-size": 10},
                     "531 Adelaide St W, Toronto": { "name": "Walmart", "line-size":32}
                },
        tribeList: {"UofT": {"members": ['Bob'], "Lists": {"List1": {"chips": 10}}}, // will take in actual users obj in DB
                    "Waterloo": {"members": ['Bob','John'],
                    "Lists": {"List2": {"apples": 3, "pears": 10}}
                }},
        displayType: "",
        selectedItem: "",
        selectedObj: {}

            }
            this.showOnPanel = this.showOnPanel.bind(this)
            this.deleteObj = this.deleteObj.bind(this)
            this.addNewData = this.addNewData.bind(this)
    }

    showOnPanel(selectedItem, displayType){
        if(displayType === "user"){
            const user = this.state.userList[selectedItem]
            this.setState({selectedItem: selectedItem, displayType: "user", selectedObj: user})    
        }
        else if (displayType === "store"){
            const store = this.state.storeList[selectedItem]
            this.setState({selectedItem: selectedItem, displayType: "store", selectedObj: store})
        }
        else if (displayType === "tribe"){
            const tribe = this.state.tribeList[selectedItem]
            this.setState({selectedItem: selectedItem, displayType: "tribe", selectedObj: tribe})
        }
    }

    deleteObj(selectedItem, displayType){

        let updatedList;

        if(displayType === "user"){
            
            updatedList = this.state.userList
            delete updatedList[selectedItem]
            this.setState({ selectedItem: "",selectedObj: {}, userList: updatedList })
        }
        else if (displayType === "store"){
            updatedList = this.state.storeList
            delete updatedList[selectedItem]
            this.setState({ selectedItem: "",selectedObj: {}, storeList: updatedList })
        }
        else if (displayType === "tribe"){
            updatedList = this.state.tribeList
            delete updatedList[selectedItem]
            this.setState({ selectedItem: "",selectedObj: {}, tribeList: updatedList })
        }
        else{
            alert("Something went wrong")
        }
        
    }

    addNewData(newData,dataType){
        if(dataType === "user"){
            this.setState({userList: newData})
        }
        else if (dataType === " store"){
            this.setState({storeList: newData})
        }
        else if (dataType === " tribe"){
            this.setState({tribeList: newData})
        }
    }

    render() {
        return (
            <div className="container-lg">
                <div className="row">
                    <div className="col-sm search">
                        <AdminSearch
                            userList={this.state.userList}
                            storeList={this.state.storeList}
                            tribeList={this.state.tribeList}
                            showPanel={this.showOnPanel}
                        />
                    
                    </div>
                    <div className="col-sm data">
                        <AdminData
                        userList={this.state.userList}
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
        )
    }
}
