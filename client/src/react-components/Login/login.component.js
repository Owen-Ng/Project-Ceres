import React, { Component } from "react";
import "./login.component.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "admin",
            password: "admin",
            isError: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    /*
    This function will have to contact the server to recieve information about the users credentials.
    Example: if passsword or username is incorrect and possibly to also recieve cookies.
    */
    async handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const testObj = {
            email: "omarshabana@gmail.com",
            password: "flare101",
        };
        const response = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            crossDomain: true,
            credentials: "same-origin",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(testObj),
        });
        console.log(response);
        if (username === "user" && password === "user") {
            this.props.setPermissions("user");
        } else if (username === "admin" && password === "admin") {
            this.props.setPermissions("admin");
        } else {
            this.setState({ isError: true });
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container-xl">
                <p>
                    <strong>Welcome to Project Ceres </strong>
                </p>
                {this.state.isError ? (
                    <p className="red">
                        <strong>Incorrect Password </strong>
                    </p>
                ) : (
                    ""
                )}
                <div className="row Login-box">
                    <div className="col-sm">
                        <form
                            className="Login-form"
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                className="Login-input"
                                type="username"
                                name="username"
                                placeholder=" Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                required
                            />

                            <input
                                className="Login-input"
                                type="password"
                                name="password"
                                placeholder=" Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />

                            <button
                                className="btn btn-success btn-login"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>
                        <p className="Login-register">
                            Don't have an account?{" "}
                        </p>
                        <a className="Login-register" href="/">
                            {" "}
                            Click to register (Coming phase 2)
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
