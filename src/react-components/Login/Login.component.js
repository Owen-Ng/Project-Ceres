import React, { Component } from "react";



export default class Login extends Component {

    constructor(props) {
        super(props);


        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const {username, password} = this.state
        if(username === "user" && password === "user"){
            this.props.setPermissions("user")
        }
        else if (username === "admin" && password === "admin"){
            this.props.setPermissions("admin")
        }
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
   

    render(){
        return (

            <div>
                <form onSubmit = {this.handleSubmit}> 
                <input type = "username"
                name = "username"
                placeholder = "Username"
                value = {this.state.username}
                onChange={this.handleChange}
                required
                />
            

                <input type = "password"
                name = "password"
                placeholder = "Password"
                value = {this.state.password}
                onChange={this.handleChange}
                required 
                /> 

                <button type = "submit">Login</button> 
                
            </form>

            </div> 
        )
    }



}