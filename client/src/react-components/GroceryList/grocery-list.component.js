/*
This page is the main page for this feature. Everything in GroceryList is called from within here 
or a child. This will be the only coomponent in this feature to call the database as it is the first and last in
the collection of data thus it is the most accurate.
*/
import React, { Component } from "react";
import "./grocery-list.css";
import GroceryListForm from "./GroceryListForm/grocery-list-form.component";
import GroceryItem from "./GroceryItem/grocery-item.component";
import GroceryListTab from "./GroceryListTab/grocery-list-tab.component";
import { v4 as uuidv4 } from "uuid";

export default class GroceryList extends Component {
    constructor(props) {
        super(props);

        // This data will all be pulled from a server

        this.state = {
            //make sure data is this format {list1: {obj1: quantity, obj2: quantity}, list2:...}
            familyLists: {},
            user: this.props.user,
            currentList: "No list selected",
            currentTribe: "",
            alphabeticallyOrdered: false,
            listEditMode: false,
            isLoaded: false,
        };
        this.addItem = this.addItem.bind(this);
        this.renderCurrentList = this.renderCurrentList.bind(this);
        this.editItem = this.editItem.bind(this);
        this.changeAlphabeticalOrdering = this.changeAlphabeticalOrdering.bind(
            this
        );
        this.deleteItem = this.deleteItem.bind(this);
        this.updateState = this.updateState.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }
    /* Not sure if we need this
    static getDerivedStateFromProps(props, state) {
        let currentTribe = props.location;
        if (currentTribe === undefined) {
            currentTribe = "Tribe 4";
        }
        const tribeLists = { familyLists: state.tribeLists[currentTribe] };

        return tribeLists;
    }
*/
    async componentDidMount() {
        const user = this.props.user;
        if (user !== null) {
            try {
                const response = await fetch(
                    `http://localhost:5000/list/${user.familyID}`,
                    {
                        method: "GET",
                        crossDomain: true,
                        credentials: "include",
                        redirect: "follow",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        referrerPolicy: "no-referrer",
                    }
                );
                const groceryLists = await response.json();
                let updatedList = {};

                groceryLists.forEach((list) => {
                    updatedList[list.listname] = list.items;
                });

                await this.setState({ familyLists: updatedList });
                const intialList = Object.keys(this.state.familyLists);

                if (intialList.length > 0) {
                    this.setState({
                        currentList: intialList[0],
                        isLoaded: true,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    updateState(updateObj) {
        this.setState(updateObj);
    }
    /*
        Later on this will call the server to hand over the new set of lists and items.
    */
    async editItem(item) {
        const currentList = this.state.currentList;
        let updatedList = this.state.familyLists;
        delete updatedList[currentList][item.prevItemName];
        updatedList[currentList][item.name] = item.quantity;
        this.setState((state) => updatedList);

        try {
            await fetch("http://localhost:5000/item", {
                method: "PATCH",
                crossDomain: true,
                credentials: "include",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    listname: currentList,
                    fid: this.props.user.familyID,
                    prevName: item.prevItemName,
                    newName: item.name,
                    quantity: item.quantity,
                }),
                referrerPolicy: "no-referrer",
            });
        } catch (err) {
            console.log(err);
        }
    }
    /*
        Later on this will call the server to hand over the new set of lists and items.
    */
    async deleteItem(itemName) {
        const currentList = this.state.currentList;
        let updatedList = this.state.familyLists;
        try {
            await fetch("http://localhost:5000/item", {
                method: "DELETE",
                crossDomain: true,
                credentials: "include",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    listname: currentList,
                    fid: this.state.user.familyID,
                    itemname: itemName,
                }),
                referrerPolicy: "no-referrer",
            });
            delete updatedList[currentList][itemName];
            this.setState({ familLists: updatedList });
        } catch (err) {
            console.log(err);
        }
    }
    /*
        Recieves items from the GroceryListForm and is passed down as a prop. Once the new item object is recieved
        the appropriate list is appended the new item. Later on this will call the server to hand over the new 
        set of lists and items.
    */
    async addItem(newItem) {
        const currentList = this.state.currentList;
        if (newItem.newItem.trim() === "") {
            alert("Please enter a valid name");
            return;
        }
        try {
            await fetch("http://localhost:5000/item", {
                method: "POST",
                crossDomain: true,
                credentials: "include",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    listname: currentList,
                    fid: this.state.user.familyID,
                    itemname: newItem.newItem,
                    quantity: newItem.newItemQuantity,
                }),
                referrerPolicy: "no-referrer",
            });
            if (currentList !== "No list selected") {
                const updatedList = this.state.familyLists;
                updatedList[currentList][newItem.newItem] =
                    newItem.newItemQuantity;
                this.setState({ familyLists: updatedList });
            } else {
                alert("Please make/select a list before inserting an item.");
            }
        } catch (err) {
            console.log(err);
        }
    }
    /*
        Calls the GroceryItem component to generate a tab with all the information given for each item on 
        the currently selected list.
    */
    renderCurrentList() {
        const currentList = this.state.currentList;
        if (currentList !== "No list selected") {
            const listObject = this.state.familyLists[currentList];
            const order = this.state.alphabeticallyOrdered;
            if (listObject !== undefined) {
                const listKeys = !order
                    ? Object.keys(listObject).sort()
                    : Object.keys(listObject).sort().reverse();
                return listKeys.map((key) => (
                    <GroceryItem
                        key={uuidv4()}
                        name={key}
                        editable={true}
                        quantity={listObject[key]}
                        editItem={this.editItem}
                        deleteItem={this.deleteItem}
                    />
                ));
            }
        }
    }
    /* 
        The function that allows the buttons on the list view panel to switch the current working list.
    */

    changeAlphabeticalOrdering(e) {
        e.checked === true ? (e.checked = false) : (e.checked = true);
        this.setState({
            alphabeticallyOrdered: !this.state.alphabeticallyOrdered,
        });
    }
    /*
    This will delete a list and later on call the server to hand over the new set of lists
    */
    async deleteList() {
        const oldList = this.state.currentList;
        const updatedListKeys = Object.keys(this.state.familyLists).filter(
            (list) => list !== oldList
        );

        let updatedList = this.state.familyLists;
        delete updatedList[oldList];
        await fetch("http://localhost:5000/list", {
            method: "DELETE",
            crossDomain: true,
            credentials: "include",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                listname: this.state.currentList,
                fid: this.props.user.familyID,
            }),
        });
        if (updatedListKeys.length > 0) {
            this.setState({ currentList: updatedListKeys[0] });
            this.setState((state) => updatedList);
        } else {
            this.setState({ currentList: "No list selected" });
        }
    }

    render() {
        const listDeleteButton = (
            <button
                className="GroceryList-list-btn btn btn-secondary btn-delete"
                onClick={this.deleteList}
            >
                Delete
            </button>
        );
        const loggedInData = (
            <div className="row">
                <div className="GroceryList-currentList col-lg-">
                    <h4 className="GroceryList-list-title">
                        {this.state.currentList}
                    </h4>
                    {this.state.currentList === "No list selected"
                        ? ""
                        : listDeleteButton}
                    {this.state.currentList !== "No list selected"
                        ? this.renderCurrentList()
                        : ""}
                    <GroceryListForm addItem={this.addItem} />
                    <br></br>
                </div>
                <GroceryListTab
                    familyLists={this.state.familyLists}
                    updateState={this.updateState}
                    currentList={this.state.currentList}
                    alphabeticallyOrdered={this.state.alphabeticallyOrdered}
                    user={this.props.user}
                />
            </div>
        );
        return (
            <div className="GroceryList container">
                {this.props.user === null ? "" : loggedInData}
            </div>
        );
    }
}
