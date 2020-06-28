/*
This page is the main page for this feature. Everything in GroceryList is called from within here 
or a child. This will be the only coomponent in this feature to call the database as it is the first and last in
the collection of data thus it is the most accurate.
*/
import React, {Component} from 'react';
import "./grocery-list.css"
import GroceryListForm from "./GroceryListForm/grocery-list-form.component"
import GroceryItem from "./GroceryItem/grocery-item.component"
import GroceryListTab from "./GroceryListTab/grocery-list-tab.component"
import { v4 as uuidv4 } from 'uuid';

export default class GroceryList extends Component{
    constructor(props) {
        super(props)
        /* Our lists will come from a database later on at time of mounting*/
        this.state = {
            familyLists:{ "List 1" : {"carrot": 10, "apple": 32}, 
                           "List 2": {"dog food" : 1, "cat food": 12 }},
            currentList: "No list selected",
            alphabeticallyOrdered: false,
            listEditMode: false
        }
        this.addItem = this.addItem.bind(this)
        this.renderCurrentList = this.renderCurrentList.bind(this)
        this.editItem = this.editItem.bind(this)
        this.changeAlphabeticalOrdering = this.changeAlphabeticalOrdering.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.updateState = this.updateState.bind(this)
        this.deleteList = this.deleteList.bind(this)
        
    }
    componentDidMount(){
        const intialList = Object.keys(this.state.familyLists)
        this.setState({currentList: intialList[0]})
    }

    updateState(updateObj){
        this.setState(updateObj)
    }
    /*
        Later on this will call the server to hand over the new set of lists and items.
    */
    editItem(item) {
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
        delete updatedList[currentList][item.prevItemName]
        updatedList[currentList][item.name] = item.quantity
        this.setState((state) =>  updatedList)
   
    }
    /*
        Later on this will call the server to hand over the new set of lists and items.
    */
    deleteItem(itemName){
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
        
        delete updatedList[currentList][itemName]
        this.setState({familLists: updatedList})
        
    }
    /*
        Recieves items from the GroceryListForm and is passed down as a prop. Once the new item object is recieved
        the appropriate list is appended the new item. Later on this will call the server to hand over the new 
        set of lists and items.
    */
    addItem(newItem){
        const currentList = this.state.currentList
        if(currentList !== "No list selected"){
            let updatedList = this.state.familyLists
            updatedList[currentList][newItem.newItem] = newItem.newItemQuantity
            this.setState({familyLists: updatedList})
        }
        else{
            alert("Please make/select a list before inserting an item.")
        }
    }
    /*
        Calls the GroceryItem component to generate a tab with all the information given for each item on 
        the currently selected list.
    */
    renderCurrentList(){
        const currentList = this.state.currentList
        if(currentList !== "No list selected"){
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
    }
    /* 
        The function that allows the buttons on the list view panel to switch the current working list.
    */

    changeAlphabeticalOrdering(e){
        e.checked === true ? e.checked = false : e.checked = true
        this.setState({alphabeticallyOrdered: !this.state.alphabeticallyOrdered})
        console.log(e.target)
    }
    /*
    This will delete a list and later on call the server to hand over the new set of lists
    */
    deleteList(){
        const oldList = this.state.currentList
        const updatedListKeys = Object.keys(this.state.familyLists).filter(list => list !== oldList)
        let updatedList =this.state.familyLists
        delete updatedList[oldList]
        if(updatedListKeys.length > 0){
            this.setState({ currentList: updatedListKeys[0] })
            this.setState ((state) =>  updatedList)
        }
        else{
            this.setState({ currentList: "No list selected" })
        }
    }

    render() {
        const listDeleteButton = <button className="GroceryList-list-btn btn btn-danger" onClick={this.deleteList}>Delete</button>
        return (
            <div className="GroceryList container" >
                <div className="row">
                    <div className="GroceryList-currentList col-lg-">
                        <h4 className="GroceryList-list-title">{this.state.currentList}</h4>
                        {this.state.currentList === "No list selected" ? "" : listDeleteButton}
                        {this.state.currentList !== "No list selected" ? this.renderCurrentList() : ""}
                        <GroceryListForm addItem={this.addItem}/>
                        <br></br>
                        Reverse Order <input type="checkbox" onClick={this.changeAlphabeticalOrdering} ></input>
                    </div>
                    <GroceryListTab
                        familyLists={this.state.familyLists}
                        updateState={this.updateState}
                        currentList={this.state.currentList}
                        alphabeticallyOrdered={this.state.alphabeticallyOrdered}
                    />
                </div>
                
            </div>
        )
    }
    
}