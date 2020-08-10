import React, { Component } from 'react';
import "./profile.css"
import { createFamily, createTribe } from "../../actions/profile"
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFamilyName: "",
      input: {
        email: "",
        password: ""
      },
      current: {
        email: "email@email.ca",
        password: "123456"
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitNewFamily = this.handleSubmitNewFamily.bind(this);
    this.handleChangeNewFamily = this.handleChangeNewFamily.bind(this);
    this.handleSubmitNewTribe = this.handleSubmitNewTribe.bind(this);
    this.handleChangeNewTribe = this.handleChangeNewTribe.bind(this);
    // this.handleChangepass = this.handleChangepass.bind(this);
  };
  handleSubmit(e) {
    e.preventDefault();
    this.setState(({ input }) => ({
      current: input,
      input: { email: "", password: "" },

    }));

  }

  handleChange(e) {
    e.preventDefault();
    const newb = { ...this.state.input, [e.target.name]: e.target.value };
    this.setState({ input: newb });

  }


  handleChangeNewFamily(e) {
    e.preventDefault();
    const fName = e.target.value;
    this.setState({ newFamilyName: fName });
  }

  handleSubmitNewFamily(e) {
    e.preventDefault();
    createFamily(this.state.newFamilyName);
    this.setState({ newFamilyName: "" });

  }


  handleChangeNewTribe(e) {
    e.preventDefault();
    const tName = e.target.value;
    this.setState({ newTribeName: tName });
  }

  handleSubmitNewTribe(e) {
    e.preventDefault();
    createTribe(this.state.newTribeName);
    this.setState({ newTribeName: "" });
  }

  render() {

    const userFamily = this.props.user ? this.props.user.familyID : null;
    const form = userFamily ? (
        <div className=" stylechanges col-md  ">
        <div className="list">
            <li > <strong>Create New Tribe:</strong></li>
          </div>
          <form onSubmit={this.handleSubmitNewTribe}>
            <input
      
              type="name"
              name="name"
              placeholder="Tribe Name"
              value = {this.state.newTribeName}
              onChange={this.handleChangeNewTribe}
              required
            />
            <br />
              <button className="buttonsubmit btn btn-primary btn-add" type="submit">Add Tribe</button>
      
            </form>
          </div>
        ) : (
        <div className=" stylechanges col-md  ">
              <div className="list">
                  <li > <strong>Create New Family:</strong></li>
                </div>
                <form onSubmit={this.handleSubmitNewFamily}>
                  <input
    
                    type="name"
                    name="name"
                    placeholder="Family Name"
                    value = {this.state.newFamilyName}
                    onChange={this.handleChangeNewFamily}
                    required
                  />
                  <br />
                  <button className="buttonsubmit btn btn-primary btn-add" type="submit">Add Family</button>
    
                </form>
              </div>
      )

    return (

      

      <div className="box container-lg">
        <div className="row">
        <div className="stylechanges col-lg ">
          <div className="list">
            <li > <strong>Email:</strong> {this.state.current.email}</li>
            <li><strong>Password:</strong> {'*'.repeat(this.state.current.password.length)}</li>

          </div>
          <form onSubmit={this.handleSubmit}>
            <input

              type="email"
              name="email"
              placeholder="New Email"
              value={this.state.input.email}
              onChange={this.handleChange}
              required
            />

            <input

              type="password"
              name="password"
              placeholder="New Password"
              value={this.state.input.password}
              onChange={this.handleChange}
              required
            />
            <br />
            <button className="buttonsubmit btn btn-primary btn-add" type="submit">Change Password and Email</button>

          </form>
        </div>
        {form }
        </div>

        <div className="stylechanges col-lg">
        <div className="list">
            <li><strong>Join Family:</strong></li>
          </div>
          <form>
            <input
              type="name"
              name="name"
              placeholder="Family Name"
              required
              />
              <br />
              <button className="buttonsubmit btn btn-primary btn-add" type="submit">Join Family</button>
          </form>
        <div className="list">
            <li><strong>Join Tribe:</strong></li>
          </div>
          <form>
            <input
              type="name"
              name="name"
              placeholder="Tribe Name"
              required
              />
              <br />
              <button className="buttonsubmit btn btn-primary btn-add" type="submit">Join Tribe</button>
          </form>
        </div>
      </div>
    )
  }
}