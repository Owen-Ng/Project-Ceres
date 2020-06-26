import React, { Component } from 'react';
import GroceryItem from '../GroceryItem/grocery-item.component'
import "./grocery-list-tab.css"
import { v4 as uuidv4 } from 'uuid';

export default class GroceryListTab extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            familyLists: this.props.familyLists,
            currentList: "No list selected",
            listInputBar: "",
        }
        this.selectList = this.selectList.bind(this)
        this.addList = this.addList.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.renderLists = this.renderLists.bind(this)
        this.makeList = this.makeList.bind(this)
    }
    
    componentDidMount(){
        const initialList = Object.keys(this.state.familyLists)
        this.setState({currentList: initialList[0]})
    }

    selectList(e){
       
        this.setState({
            currentList:  e.target.name
        })
        this.props.updateState({currentList: e.target.name})
    }

    addList(e){
        e.preventDefault()
        let updatedList = this.state.familyLists
        const listInputBar = this.state.listInputBar

        if(updatedList[listInputBar] !== undefined)
        {
            alert("A list with that name is already available, please select another.")
        }
        else if(listInputBar === ""){
            alert("Please enter a name")
        }
        else{
            updatedList[listInputBar] = {}
            this.props.updateState({familyLists: updatedList})
            this.setState({familyLists: updatedList})
        }

    }

       /*
        Loops through every available list and calls another function which does the same for each item for that lists
    */
   renderLists(){
    const familyLists = this.state.familyLists
    const lists = Object.keys(familyLists)
    return lists.map(list => 
        <div key={uuidv4()}>
            <button 
            name={list} 
            key={uuidv4()}
            onClick={this.selectList} 
            className="GroceryList-list-change-btn">{list}</button>

            <ul className="GroceryListTab-list">
                {this.makeList(familyLists[list])}
            </ul>
        </div>

        )

}
/*
    A helper function for renderLists. In order to make an the <li> for each item on a list
    we need to invidually iterate through each item. Given on list i.e {list1: item: 3,...}
    we map each item and its quantity to a <li> and a GroceryItem component so that it can be returned to renderLists.
*/
    makeList(listObject){
    
        const order = this.props.alphabeticallyOrdered
        const listKeys = !order ? Object.keys(listObject).sort(): Object.keys(listObject).sort().reverse()
        
        return listKeys.map(key => 
            <li key={uuidv4()}>
                <GroceryItem 
                    key={uuidv4()}
                    editable= {false}
                    name={key}
                    quantity={listObject[key]}
                />
            </li>

            )
    }

    onInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
         })
    }
    render() {
        return (
            <div className="GroceryListTab col-sm">
                        {this.state.currentList !== "No list selected" ? this.renderLists() : ""}
                        <form onSubmit={this.addList} >
                            New List 
                            <input
                                className="GroceryListTab-item-input"
                                name="listInputBar"
                                type="text"
                                value={this.state.listInputBar}
                                placeholder="New list name"
                                onChange={this.onInputChange}
                                 />
                            <button className="GroceryListTab-btn btn btn-primary">+</button>
                        </form>
                    </div>
        )
    }




}