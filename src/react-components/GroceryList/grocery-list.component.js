import React, {Component} from 'react';
import "./grocery-list.css"
import GroceryListForm from "./GroceryListForm/grocery-list-form.component"
import GroceryItem from "./GroceryItem/grocery-item.component"
export default class GroceryList extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            familyLists:{ "List 1" : {"carrot": 10, "apple": 32}, 
                           "List 2": {"dog food" : 1, "cat food": 12 }},
            currentList: "List 1" 
        }
        this.addItem = this.addItem.bind(this)
        this.renderCurrentList = this.renderCurrentList.bind(this)
        this.renderLists = this.renderLists.bind(this)
        this.makeList = this.makeList.bind(this)
        this.selectList = this.selectList.bind(this)
    }

    /*
        Recieves items from the GroceryListForm and is passed down as a prop. Once the new item object is recieved
        the appropriate list is appended the new item.
    */
    addItem(state){
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
        updatedList[currentList][state.newItem] = state.newItemQuantity
        this.setState({familyLists: updatedList})
    }
    /*
        Calls the GroceryItem component to generate a tab with all the information given for each item on 
        the currently selected list.
    */
    renderCurrentList(){
        const currentList = this.state.currentList
        const familyList = this.state.familyLists[currentList]
        const keys = Object.keys(familyList)

    return keys.map(key =>
        
        <GroceryItem 
            name={key}
            quantity={familyList[key]}
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
        const listKeys = Object.keys(listObject)
        return listKeys.map(key => 
            <li>
                 <GroceryItem 
                    name={key}
                    quantity={listObject[key]}
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


    render() {
        return (
            <div className="GroceryList container" >
                <div className="row">
                    <div className="GroceryList-currentList col-lg-">

                        <h3>{this.state.currentList}</h3>
                        {this.renderCurrentList()}
                        <GroceryListForm addItem={this.addItem}/>
                    </div>
                    <div className="GroceryList-lists col-sm">
                        {this.renderLists()}
                    </div>
                </div>
                
            </div>
        )
    }
    
}

