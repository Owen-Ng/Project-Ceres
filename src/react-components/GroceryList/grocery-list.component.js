import React, {Component} from 'react';
import "./grocery-list.css"
import GroceryListForm from "./GroceryListForm/grocery-list-form.component"
import GroceryItem from "./GroceryItem/grocery-item.component"

import { v4 as uuidv4 } from 'uuid';

export default class GroceryList extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            familyLists:{ "List 1" : {"carrot": 10, "apple": 32}, 
                           "List 2": {"dog food" : 1, "cat food": 12 }},
            currentList: "List 1",
            alphabeticallyOrdered: false
        }
        this.addItem = this.addItem.bind(this)
        this.renderCurrentList = this.renderCurrentList.bind(this)
        this.renderLists = this.renderLists.bind(this)
        this.makeList = this.makeList.bind(this)
        this.selectList = this.selectList.bind(this)
        this.editItem = this.editItem.bind(this)
        this.changeAlphabeticalOrdering = this.changeAlphabeticalOrdering.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    editItem(item) {
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
  
        delete updatedList[currentList][item.prevItemName]
        updatedList[currentList][item.name] = item.quantity
        this.setState((state) =>  updatedList)
   
    }
    
    deleteItem(itemName){
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
        
        delete updatedList[currentList][itemName]
        this.setState({ familyLists: updatedList})
        
    }
    /*
        Recieves items from the GroceryListForm and is passed down as a prop. Once the new item object is recieved
        the appropriate list is appended the new item.
    */
    addItem(newItem){
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
        updatedList[currentList][newItem.newItem] = newItem.newItemQuantity
        this.setState({familyLists: updatedList})
    }
    /*
        Calls the GroceryItem component to generate a tab with all the information given for each item on 
        the currently selected list.
    */
    renderCurrentList(){
        const currentList = this.state.currentList
        const listObject = this.state.familyLists[currentList]
        const order = this.state.alphabeticallyOrdered
        const listKeys = !order ? Object.keys(listObject).sort(): Object.keys(listObject).sort().reverse()

    return listKeys.map(key =>
        
        <GroceryItem 
            key={uuidv4()}
            name={key}
            editable={true}
            quantity={listObject[key]}
            editItem={this.editItem}
            deleteItem={this.deleteItem}
        />
        
        )
    }
    /*
        Loops through every available list and calls another function which does the same for each item for that lists
    */
    renderLists(){
        const familyLists = this.state.familyLists
        const lists = Object.keys(familyLists)
        return lists.map(list => 
            <div>
                <button 
                name={list} 
                onClick={this.selectList} 
                className="GroceryList-list-change-btn">{list}</button>
                <ul>
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
        
        const order = this.state.alphabeticallyOrdered
        const listKeys = !order ? Object.keys(listObject).sort(): Object.keys(listObject).sort().reverse()
        const editable = listKeys === Object.keys(this.state.familyLists[this.state.currentList]).sort()
        return listKeys.map(key => 
            <li>
                 <GroceryItem 
                    key={uuidv4()}
                    editable= {editable}
                    name={key}
                    quantity={listObject[key]}
                    editItem={this.editItem}
                    deleteItem={this.deleteItem}
                />
            </li>

            )
    }
    /* 
        The function that allows the buttons on the list view panel to switch the current working list.
    */
    selectList(e){
        e.preventDefault()
        this.setState({
            currentList:  e.target.name
        })
    }

    changeAlphabeticalOrdering(e){
        e.checked === true ? e.checked = false : e.checked = true
        this.setState({alphabeticallyOrdered: !this.state.alphabeticallyOrdered})
        console.log(e.target)
    }

    render() {
        return (
            <div className="GroceryList container" >
                <div className="row">
                    <div className="GroceryList-currentList col-lg-">

                        <h3>{this.state.currentList}</h3>
                        {this.renderCurrentList()}
                        <GroceryListForm addItem={this.addItem}/>
                        <br></br>
                        Reverse Order <input type="checkbox" onClick={this.changeAlphabeticalOrdering} ></input>
                    </div>
                    <div className="GroceryList-lists col-sm">
                        {this.renderLists()}
                    </div>
                </div>
                
            </div>
        )
    }
    
}

