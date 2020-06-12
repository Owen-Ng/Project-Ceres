import React, {Component} from 'react';
import "./styles/GroceryList.css"
import GroceryListForm from "./GroceryListForm"
import GroceryItem from "./GroceryItem"
class GroceryList extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            familyLists:{ "List 1" : {"carrot": 10, "apple": 32}, 
                           "List 2": {"dog food" : 1, "cat food": 12 }},
                        currentList: "List 1" 
        }
        this.addItem = this.addItem.bind(this)
        this.renderCurrentList = this.renderCurrentList.bind(this)
    }


    addItem(state){
        const currentList = this.state.currentList
        let updatedList = this.state.familyLists
        updatedList[currentList][state.newItem] = state.newItemQuantity
        this.setState({familyLists: updatedList})
    }

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

    render() {
        return (
            <div className="GroceryList">
                <div className="GroceryList-currentList">
                    {this.renderCurrentList()}
                    <GroceryListForm addItem={this.addItem}/>
                </div>
                <div className="GroceryList-lists">
                    
                </div>
            </div>
        )
    }
    
}

export default GroceryList;
