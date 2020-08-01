import React, { Component } from 'react';
import "./profile.css"
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
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
        <div className=" stylechanges col-md  ">
        <div className="list">
            <li > <strong>Create New Family:</strong></li>
          </div>
          <form>
            <input

              type="name"
              name="name"
              placeholder="Family Name"
              // value = {}
              // onChange={}
              required
            />
            <br />
            <button className="buttonsubmit btn btn-primary btn-add" type="submit">Add Family</button>

          </form>
        </div>
        </div>
      </div>
    )
  }
}