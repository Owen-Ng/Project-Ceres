import React, {Component} from 'react';
import "./grocery-list.css"
import GroceryListForm from "./GroceryListForm/grocery-list-form.component"
import GroceryItem from "./GroceryItem/grocery-item.component"
import GroceryListTab from "./GroceryListTab/grocery-list-tab.component"
import { v4 as uuidv4 } from 'uuid';

export default class GroceryList extends Component{
    constructor(props) {
        super(props)
    
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
        this.setState({familLists: updatedList})
        
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
    
        return (
            <div className="GroceryList container" >
                <div className="row">
                    <div className="GroceryList-currentList col-lg-">
                        <h3 className="GroceryList-list-title">{this.state.currentList}</h3>
                        <button className="GroceryList-list-btn" onClick={this.deleteList}>Delete</button>
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

