import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store'

class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    //Potentially filter with buttons here?
    // const adminUsers = allUsers.filter(users => users.isAdmin === true)
    // const nonAdminUsers = allUsers.filter(users => users.isAdmin === false)
    return (
      <div className="user-display">
        <div className="section-header">
          <div className="title-box color-darkred"><h2>Users</h2></div>
        </div>
        <div className="user-list-header">
          <div className="user-details col-xs-2"><h4>EMAIL</h4></div>
          <div className="user-details col-xs-2"><h4>TITLE</h4></div>
        </div>
        {!this.props.allUsers.length
          ? <div>No users to see here!</div>
          : <div>
              {this.props.allUsers.map(user => {
                return (
                  <Link key={user.id} to={`/users/${user.id}`}>
                    <div className="user-list">
                      <div className="user-details col-xs-2">{user.email}</div>
                      <div className="user-details col-xs-2">{user.isAdmin ? 'Admin' : 'User'}</div>
                      <button className="btn btn-success user-details">Edit User</button>
                    </div>
                  </Link>
                )
              })}
            </div>
          }
      </div>
      )
    }
}

// Container
const mapState = ({ allUsers, currentUser }) => {
  return ({
    currentUser,
    allUsers
  })
}
const mapDispatch = { fetchUsers }

export default connect(mapState, mapDispatch)(AllUsers);
