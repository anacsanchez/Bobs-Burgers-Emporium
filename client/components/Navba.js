import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link} from 'react-router-dom'
import { logout } from '../store'
import { GuestCart, UserCart } from './index'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <nav>
        <Link to="/">
          <div className="nav-logo">
            <img src="https://image.ibb.co/gK2T07/bobs_burgers_banner2.png" />
          </div>
        </Link>
        <div className="all-nav">
        <div className="nav-items">
        {isLoggedIn ? (
          <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/categories">Product Catalog</Link>
          {/* <UserCart /> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/categories">Product Catalog</Link>
          {/* <GuestCart /> */}
        </div>
        ) }

      {isAdmin ? (
        <div>
          <Link to="/orders">All Orders</Link>
          <Link to="/users">All Users</Link>
        </div>
       ) : null }
       </div>
       {isLoggedIn ? <UserCart /> : <GuestCart />
       }
       </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    //Use '!!' with currentUser to coerce id into a truthy/falsey value; since Admin is already a boolean
    //we don't need the double bang! :D
    isLoggedIn: !!state.currentUser.id,
    isAdmin: state.currentUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
