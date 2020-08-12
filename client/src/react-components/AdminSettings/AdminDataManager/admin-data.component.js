import React, { Component } from "react";
import "./admin-data.css";
export default class AdminData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataType: "family",
            dataName: "",
            familyName: "",
            storeAddress: "",
            families: "",
            users: "",
        };
        this.familyMode = this.familyMode.bind(this);
        this.storeMode = this.storeMode.bind(this);
        this.tribeMode = this.tribeMode.bind(this);

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    familyMode() {
        this.setState({ dataType: "family" });
    }
    storeMode() {
        this.setState({ dataType: "store" });
    }
    tribeMode() {
        this.setState({ dataType: "tribe" });
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    /*
        Creates a new list of what needs to be updated and then pushes it up to the admin settings (parent) for
        universal changes including the database.
    */
    handleSubmit(e) {
        e.preventDefault();
        if (
            this.state.dataType === "family" &&
            this.state.dataType.length > 0
        ) {
            let familyList = this.props.familyList;

            if (familyList[this.state.dataName] === undefined) {
                familyList[this.state.dataName] = this.state.users.split(" ");
                this.props.addNewData(familyList, this.state.dataType);
                alert(`Added  ${this.state.dataName}`);
            } else {
            }
        } else if (this.state.dataType === "store") {
            let storeList = this.props.storeList;
            if (
                storeList[this.state.storeAddress] === undefined &&
                this.state.storeAddress.length > 0
            ) {
                storeList[this.state.storeAddress] = {
                    name: this.state.dataName,
                    "line-size": 0,
                };
                this.props.addNewData(storeList, this.state.dataType);
                alert(`Added  ${this.state.dataName}`);
            } else
                alert(
                    "A store with that address already exists (or it's too short)"
                );
        } else if (this.state.dataType === "tribe") {
            let tribeList = this.props.tribeList;
            if (
                tribeList[this.state.dataName] === undefined &&
                this.state.dataType.length > 0
            ) {
                const families = this.state.families.split(" ");
                tribeList[this.state.dataName] = families;
                this.props.addNewData(tribeList, this.state.dataType);
                alert(`Added  ${this.state.dataName}`);
            } else
                alert(
                    "A tribe with that name already exists (or it's too short)"
                );
        }
    }

    render() {
        const familyData = (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        (Note: All "users" entries must be seperated by a space)
                    </p>
                    <input
                        className="AdminData-input"
                        name="dataName"
                        type="text"
                        placeholder="Enter family's name"
                        onChange={this.onInputChange}
                        value={this.state.dataName}
                        autoComplete="off"
                    />
                    <input
                        className="AdminData-input"
                        name="familyName"
                        type="text"
                        placeholder="Enter family's tribe"
                        onChange={this.onInputChange}
                        value={this.state.familyName}
                        autoComplete="off"
                    />
                    <input
                        className="AdminData-input"
                        name="users"
                        type="text"
                        placeholder="Enter users"
                        onChange={this.onInputChange}
                        value={this.state.users}
                        autoComplete="off"
                    />
                    <button className="btn btn-primary btn-add">
                        Add Family
                    </button>
                </form>
            </div>
        );

        const storeData = (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="AdminData-input"
                        name="dataName"
                        type="text"
                        placeholder="Enter store name"
                        onChange={this.onInputChange}
                        value={this.state.dataName}
                        autoComplete="off"
                    />
                    <input
                        className="AdminData-input"
                        name="storeAddress"
                        type="text"
                        placeholder="Enter store address"
                        onChange={this.onInputChange}
                        value={this.state.storeAddress}
                        autoComplete="off"
                    />
                    <button className="btn btn-primary btn-add">
                        Add Store
                    </button>
                </form>
            </div>
        );

        const tribeData = (
            <div>
                <p>
                    (Note: All "families" entries must be seperated by a space)
                </p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="AdminData-input"
                        name="dataName"
                        type="text"
                        placeholder="Enter tribe name"
                        onChange={this.onInputChange}
                        value={this.state.dataName}
                        autoComplete="off"
                    />
                    <input
                        className="AdminData-input"
                        name="families"
                        type="text"
                        placeholder="Enter all families"
                        onChange={this.onInputChange}
                        value={this.state.families}
                        autoComplete="off"
                    />
                    <button className="btn btn-primary btn-add">
                        Add Tribe
                    </button>
                </form>
            </div>
        );
        return (
            <div className="AdminData">
                <p>Add data</p>
                <div className="btn-group" role="group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.familyMode}
                    >
                        Family
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.storeMode}
                    >
                        Store
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.tribeMode}
                    >
                        Tribe
                    </button>
                </div>

                {this.state.dataType === "family" ? familyData : ""}
                {this.state.dataType === "store" ? storeData : ""}
                {this.state.dataType === "tribe" ? tribeData : ""}
            </div>
        );
    }
}
