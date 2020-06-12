import React, {Component} from 'react';
import "./styles/GroceryListForm.css"

class GroceryListForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            newItem: "",
            newItemQuantity: 0
    }
        this.onInputChange = this.onInputChange.bind(this)
        this.sendItem = this.sendItem.bind(this)

        this.addItem = this.props.addItem;

    }   

    onInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
         })
    }

    sendItem(e){
        e.preventDefault()
        this.addItem(this.state)
    }

    

    render() {
        return (
            <div className="GroceryListForm-order">
                <form onSubmit={this.sendItem}>
                    <label htmlFor="item"></label>
                    <input
                    className="GroceryListForm-item-input"
                    name="newItem"
                    type="text"
                    value={this.state.newItem}
                    onChange={this.onInputChange}
                    />
                    <label htmlFor="quantity"></label>
                    <input
                    className="GroceryListForm-quantity-input"
                    name="newItemQuantity"
                    type="number"
                    value={this.state.newItemQuantity}
                    onChange={this.onInputChange}
                    />
                    <button className="GroceryListForm-add">Add</button>
                </form>
            </div>
        )
    }
    
}

export default GroceryListForm


