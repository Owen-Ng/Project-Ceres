import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./admin-panel.css"

export default class AdminPanel extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            displayType: this.props.displayType,
            selectedItem: this.props.selectedItem,
            selectedObj: this.props.selectedObj

        }
        this.displayUser = this.displayUser.bind(this)
        this.deleteObj = this.deleteObj.bind(this)
    }

    deleteObj(){
        this.props.deleteObj(this.props.selectedItem, this.props.displayType)
    }

   

    displayUser(){
        const deleteButton = <button className="btn btn-danger" onClick={this.deleteObj}>Delete</button>
        if(this.props.selectedObj !== undefined && this.props.displayType === "user"){
            return  (
                <div key={uuidv4()} >
                    <p>Username: {this.props.selectedItem}</p>
                    <p>Family Name: {this.props.selectedObj["familyName"]}</p>
                    {deleteButton}
                </div>)
                
        }
        else if(this.props.selectedObj !== undefined && this.props.displayType === "store"){
            return  (
                <div key={uuidv4()}>
                    <p>Store name: {this.props.selectedObj["name"]}</p>     
                    <p>Address: {this.props.selectedItem}</p>
                    <p>Line size: {this.props.selectedObj["line-size"]}</p>
                    {deleteButton}
                </div>)
        }
        else if (this.props.selectedObj !== undefined && this.props.displayType === "tribe"){
            let members = this.props.selectedObj['members']
            if(members !== undefined){
                return  (
                    <div key={uuidv4()}>
                        <p>Tribe Name: {this.props.selectedItem}</p>
                        <p className="AdminPanel-tribe-members">Tribe Members: {members.map(member => member.concat('\n'))}</p>
                        {deleteButton}
                    </div>)
            }
            
        }
  
    }

    render() {
        return (
            <div className="AdminPanel">
                {this.displayUser()}
            </div>
        )
    }
    

}