import React, { Component } from "react";



export default class Login extends Component {

    constructor(props) {
        super(props);


        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const { username, password } = this.state;
    }

    render(){
        return (

            <div>
                <form onSubmit = {this.handleSubmit}> 
                <input type = "username"
                name = "username"
                placeholder = "Username"
                value = {this.state.username}
                required
                />
            

                <input type = "password"
                name = "password"
                placeholder = "Password"
                value = {this.state.password}
                required 
                /> 

                <button type = "submit">Login Now</button> 
                
            </form>

            </div> 
        )
    }



}