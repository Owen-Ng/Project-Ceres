import React, {Component} from 'react';
import "./styles/GroceryList.css"
import GroceryListForm from "./GroceryListForm"

class GroceryList extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            familyLists:{ "List 1" : {"carrot": 10, "apple": 32}, 
                           "List 2": {"dog food" : 1, "cat food": 12 }},
        }
        this.addItem = this.addItem.bind(this)
    }


    addItem(e){
        e.preventDefault();

    }

    render() {
        return (
            <div className="GroceryList">
                <GroceryListForm addItem={this.addItem}/>
            </div>
        )
    }
    
}

export default GroceryList;
