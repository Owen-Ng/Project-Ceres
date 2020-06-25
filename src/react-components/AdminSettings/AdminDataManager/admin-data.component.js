import React, { Component}from 'react';
import "./admin-data.css"
export default class AdminData extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             dataType: "user",
             dataName: "",
             familyName: "",
             storeAddress: ""
        }
        this.userMode = this.userMode.bind(this)
        this.storeMode = this.storeMode.bind(this)
        this.tribeMode = this.tribeMode.bind(this)

        this.onInputChange = this.onInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    userMode(){ this.setState({dataType: "user"})}
    storeMode(){ this.setState({dataType: "store"})}
    tribeMode(){ this.setState({dataType: "tribe"})}

    addUser(){

    }

    onInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.dataType === "user" && this.state.dataType.length > 0){
            let userList = this.props.userList
            if(userList[this.state.dataName] === undefined){
                userList[this.state.dataName] = {"familyName": this.state.familyName }
                this.props.addNewData(userList, this.state.dataType)
                alert(`Added  ${this.state.dataName}`)
            }
            else alert("A user with that name already exists")

        }
        else if (this.state.dataType === "store"){
            let storeList = this.props.storeList
            if(storeList[this.state.storeAddress] === undefined && this.state.storeAddress.length > 0){
                storeList[this.state.storeAddress] = {"name":this.state.dataName, "line-size": 0}
                this.props.addNewData(storeList, this.state.dataType)
                alert(`Added  ${this.state.dataName}`)
            }
            else alert("A store with that address already exists")
            
        }
        else if (this.state.dataType === "tribe"){
            let tribeList = this.props.tribeList
            if(tribeList[this.state.dataName] === undefined && this.state.dataType.length > 0){
                tribeList[this.state.dataName] = {"members": [], "Lists": {} }
                this.props.addNewData(tribeList, this.state.dataType)
                alert(`Added  ${this.state.dataName}`)
            }
            else alert("A tribe with that name already exists")
        }
    }

    render() {
        const userData = 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        className="AdminData-input"
                        name="dataName"
                        type="text"    
                        placeholder="Enter user's name"
                        onChange={this.onInputChange}
                        value={this.state.dataName}
                        autoComplete="off"
                    />
                     <input 
                        className="AdminData-input"
                        name="familyName"
                        type="text"    
                        placeholder="Enter user's family"
                        onChange={this.onInputChange}
                        value={this.state.familyName}
                        autoComplete="off"
                    />
                    <button className="btn btn-primary">Add User</button>
                </form>
            </div>

        const storeData = 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        className="AdminData-input"
                        name="dataName"
                        type="text"    
                        placeholder="Enter store name"
                        onChange={this.onInputChange}
                        value={this.state.dataName}
                        autoComplete="off"
                    />
                    <input 
                        className="AdminData-input"
                        name="storeAddress"
                        type="text"    
                        placeholder="Enter store address"
                        onChange={this.onInputChange}
                        value={this.state.storeAddress}
                        autoComplete="off"
                    />
                    <button className="btn btn-primary">Add Store</button>
                </form>
            </div>

        const tribeData = 
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            className="AdminData-input"
                            name="dataName"
                            type="text"    
                            placeholder="Enter tribe name"
                            onChange={this.onInputChange}
                            value={this.state.dataName}
                            autoComplete="off"
                        />
                        <button className="btn btn-primary">Add Tribe</button>
                    </form>
                </div>
        return (
            <div className="AdminData">
                <p>Add data</p>
                <div className="btn-group" role="group" >
                    <button type="button" className="btn btn-secondary" onClick={this.userMode}>User</button>
                    <button type="button" className="btn btn-secondary" onClick={this.storeMode}>Store</button>
                    <button type="button" className="btn btn-secondary" onClick={this.tribeMode}>Tribe</button>
                </div>

                {(this.state.dataType === "user") ? userData : ""}
                {(this.state.dataType === "store") ? storeData : ""}
                {(this.state.dataType === "tribe") ? tribeData : ""}   
            </div>
        )
    }
}