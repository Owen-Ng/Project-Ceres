import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./map.css";
import Map from "./Map.item/Mapapi";
export default class Maps extends Component {
    constructor(props) {
        super(props);

        // This data will all be pulled from a server
        this.state = {
            currentstate: {
                Store: "",
                Address: "",
                Hours: "",
                Wait_time: "",
            },

            Lists: {
                "List 1": {
                    Store: "Winners",
                    Address: "MISSI RD",
                    Hours: "8am-9pm",
                    Wait_time: "20min",
                },
                "List 2": {
                    Store: "Loblaws",
                    Address: "Port RD",
                    Hours: "8am-9pm",
                    Wait_time: "20min",
                },
                "List 3": {
                    Store: "Plavc",
                    Address: "A ro RD",
                    Hours: "8am-9pm",
                    Wait_time: "20min",
                },
            },
            City: {
                mississauga: [43.587684, -79.646186],
                etobicoke: [43.61847, -79.514554],
                toronto: [43.651717, -79.383545],
                scarborough: [43.774614, -79.259978],
                york: [43.694012, -79.450578],
            },
            citystate: "",
            currentcity: "etobicoke",
        };
        this.change = this.change.bind(this);
        this.getdata = this.getdata.bind(this);
        this.changecity = this.changecity.bind(this);
        this.Keypress = this.Keypress.bind(this);
    }
    getdata(info, address, hour, wait) {
        const something = {
            Store: info,
            Address: address,
            Hours: hour,
            Wait_time: wait,
        };
        this.setState({ currentstate: something });
    }
    change(item) {
        const something = this.state.Lists[item];

        this.setState({ currentstate: something });
    }
    changecity(event) {
        console.log(event);
        const target = event.target;
        const value = target.value;
        this.setState({ citystate: value });
    }
    Keypress(event) {
        const key = event.Keycode || event.which;

        if (key === 13) {
            if (this.state.citystate in this.state.City) {
                this.setState(({ citystate }) => ({
                    citystate: "",
                    currentcity: citystate,
                }));
            } else {
                this.setState({ citystate: "City does not exist" });
                setTimeout(
                    function () {
                        this.setState({ citystate: "" });
                    }.bind(this),
                    1000
                );
                //alert("Does not exist")
            }
        }
    }

    render() {
        return (
            <div className="mapcenter container-xl">
                <div className="row">
                    <div className="mapcolor p-1 m-0 col-lg-9 border border-dark">
                        <Map
                            name={this.state.currentcity}
                            city={this.state.City[this.state.currentcity]}
                            senddata={this.getdata}
                        />
                    </div>
                    <div className="backcolor p-0 m-0 col-3 border border-dark ">
                        <div className="mapborderbottom">
                            <input
                                name="currentcity"
                                value={this.state.citystate}
                                onChange={this.changecity}
                                onKeyUp={this.Keypress}
                                type="text"
                                className="inputext m-2 border-dark"
                                placeholder="Enter City"
                            />
                        </div>
                        <div className="infor">
                            <p>
                                Store Info:{" "}
                                <strong>{this.state.currentstate.Store}</strong>{" "}
                            </p>
                            <p>
                                Address:{" "}
                                <strong>
                                    {this.state.currentstate.Address}
                                </strong>{" "}
                            </p>
                            <p>
                                Hours:{" "}
                                <strong>{this.state.currentstate.Hours}</strong>{" "}
                            </p>
                            <p>
                                Wait time:{" "}
                                <strong>
                                    {this.state.currentstate.Wait_time}
                                </strong>{" "}
                            </p>
                        </div>
                        <div className="bottomtext">
                            <span> Report how long your visit took</span>
                            <input
                                id="report"
                                type="text"
                                className="waitTime"
                                placeholder="Enter time taken"
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
