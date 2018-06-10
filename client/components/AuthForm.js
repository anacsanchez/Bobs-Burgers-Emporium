import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (

    <div className="form-login">
    <div className="outer-border bg-gray"><div className="red-border"><div className="inner-border padding-20">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email" className="color-white"><small>Email</small></label>
          <input name="email" required type="text" className="input-font" />
        </div>
        <div>
          <label htmlFor="password" className="color-white"><small>Password</small></label>
          <input name="password" required type="password" className="input-font" />
        </div>
        <br />
        <div>
          <button type="submit" className="btn btn-warning">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <br />
      <a href="/auth/google"><img src="/btn_google_signin.png" alt="Google signin button" id="google-button" /></a>
    </div></div></div></div>
  )
}

/**
 * CONTAINER
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.currentUser.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.currentUser.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
