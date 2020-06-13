import React, {Component} from 'react';
import "./styles/GroceryItem.css"

class GroceryItem extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    render() {
        return (
            <div className="GroceryItem container">

                <p className="GroceryItem-info">{this.props.name}</p>
                <p className="GroceryItem-info">{this.props.quantity}</p>
            </div>
        )
    }

}

export default GroceryItem