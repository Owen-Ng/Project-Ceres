import React, { Component } from 'react';

export default class AdminSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
         isAdmin: true, //authentication will need to be provided on page load once the server is up
         users: {"Bob": {"familyName": "UofT"}, "John": {"familyName": "Waterloo"}}

    }
}

render() {
    return (
        <div className="AdminSetting container">
            <p>Admin component</p>
        </div>
    )
}
}
