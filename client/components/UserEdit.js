import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserToEdit, updateUserToEdit } from '../store'

class UserEdit extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserToEdit(this.props.match.params.userId);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let isAdmin = event.target.admin.value;
    let user = {
      id: this.props.userToEdit.id,
      email: email,
      isAdmin: isAdmin
    }
    this.props.updateUserToEdit(user);
  }

  render() {
    let userToEdit = this.props.userToEdit;
    if (!userToEdit.email) {
      return <div>No User Selected</div>
    } else {
      return (
        <div>
          <form className="section-body" onSubmit={this.handleSubmit}>
            <label>Email:
            <input
                name="email"
                defaultValue={userToEdit.email}
              />
            </label>
            <label>Admin:
            <input
                type="checkbox"
                name="admin"
                value={userToEdit.isAdmin}
              />
            </label>
            <button className="btn btn-success" type="submit">Update</button>
          </form>
        </div>
      )
    }
  }
}

// Container
const mapState = ({ allUsers, userToEdit }) => ({ allUsers, userToEdit })
const mapDispatch = { fetchUserToEdit, updateUserToEdit }

export default connect(mapState, mapDispatch)(UserEdit);
