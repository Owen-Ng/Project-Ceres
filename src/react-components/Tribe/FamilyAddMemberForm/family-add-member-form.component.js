import React, {Component} from 'react';
import "./family-add-member-form.css";

export default class FamilyAddMemberForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newMemberID: ""
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.sendMember = this.sendMember.bind(this);

    this.addMember = this.props.addMember;

  }

  onInputChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  sendMember(e) {
    e.preventDefault()
    this.addMember(this.state);
  }

  render() {
    return (
      <div className="FamilyMemberAddForm-order">
        <form onSubmit={this.sendMember}>
          <label htmlFor="member">Family Member Username</label>
          <input
          className="FamilyMemberAddForm-member-input"
          name="newMemberID"
          type="text"
          defaultValue={this.state.newMemberID}
          onChange={this.onInputChange}
          required
          />
          <button className="FamilyMemberAddForm-add">Add</button>
        </form>
      </div>
    )
  }
}