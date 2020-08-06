import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "jquery/dist/jquery.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Navbar from "./react-components/Navbar/navbar.component";
//import Home from "./react-components/Home/home.component"
import Login from "./react-components/Login/login.component.js";
import Maps from "./react-components/Maps/maps.component";
import Tribe from "./react-components/Tribe/tribe.component";
import GroceryList from "./react-components/GroceryList/grocery-list.component";
import AdminSettings from "./react-components/AdminSettings/admin-settings.component";
import Profile from "./react-components/Profile/profile.component";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            isFamilyAdmin: false,
            isTribeAdmin: false,
            loggedIn: false,
            username: "",
            user: null,
        };
        this.setPermissions = this.setPermissions.bind(this);
        this.determinePermissions = this.determinePermissions.bind(this);
        this.logout = this.logout.bind(this);
    }
    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "GET",
                crossDomain: true,
                credentials: "include",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
                referrerPolicy: "no-referrer",
            });
            if (response.status < 400) {
                const user = await response.json();
                if (!user) {
                    return;
                }
                this.setState({ user });
                this.determinePermissions(user);
            }
        } catch (err) {
            console.log(err);
        }
    }
    setPermissions(permissionString, username) {
        if (permissionString === "user") {
            this.setState({
                isAdmin: false,
                isFamilyAdmin: false,
                isTribeAdmin: false,
                loggedIn: true,
                username,
            });
            return <Redirect to="/map" />;
        } else if (permissionString === "familyAdmin") {
            this.setState({ isFamilyAdmin: true, loggedIn: true, username });
            return <Redirect to="/map" />;
        } else if (permissionString === "tribeAdmin") {
            this.setState({ isTribeAdmin: true, loggedIn: true, username });
            return <Redirect to="/map" />;
        } else if (permissionString === "admin") {
            this.setState({
                isAdmin: true,
                isFamilyAdmin: true,
                isTribeAdmin: true,
                loggedIn: true,
                username,
            });

            return <Redirect to="/map" />;
        } else {
            alert("Unable to establish permissions");
        }
    }
    determinePermissions(user) {
        if (user.admin) {
            this.setPermissions("admin", user.name);
        } else if (user.tribeAdmin) {
            this.setPermissions("tribeAdmin", user.name);
        } else if (user.familyAdmin) {
            this.props.setPermissions("familyAdmin", user.name);
        } else if (!user.admin || !user.tribeAdmin || !user.familyAdmin) {
            this.setPermissions("user", user.name);
        }
        this.setState({ user });
    }

    async logout() {
        this.setState({ isAdmin: false, loggedIn: false, username: "" });
        await fetch("http://localhost:5000/users/logout", {
            method: "GET",
            crossDomain: true,
            credentials: "include",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
        });
        return <Redirect to="/map" />;
    }

    render() {
        return (
            <Router>
                {this.state.loggedIn ? <Redirect to="/map" /> : ""}
                <Navbar
                    isAdmin={this.state.isAdmin}
                    loggedIn={this.state.loggedIn}
                    logout={this.logout}
                />
                <br />
                <Route path="/" exact component={Maps} />
                <Route
                    path="/login"
                    exact
                    render={() => (
                        <Login
                            determinePermissions={this.determinePermissions}
                            loggedIn={this.state.loggedIn}
                            user={this.state.user}
                        />
                    )}
                />

                <Route
                    path="/map"
                    exact
                    render={() => <Maps user={this.state.user} />}
                />
                <Route
                    path="/tribe"
                    exact
                    render={() => <Tribe user={this.state.user} />}
                />
                <Route
                    path="/grocerylists"
                    exact
                    render={() => <GroceryList user={this.state.user} />}
                />

                <Route
                    path="/admin"
                    exact
                    render={() => <AdminSettings user={this.state.user} />}
                />
                <Route
                    path="/profile"
                    exact
                    render={() => <Profile user={this.state.user} />}
                />
            </Router>
        );
    }
}
