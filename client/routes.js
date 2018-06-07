import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllProducts, SingleProduct, NewProduct, AllCategories, NewCategory, SingleCategory, AllOrders, SingleOrder, AllUsers, UserEdit, Checkout} from './components'
import { me, fetchInitialOrder, fetchCartItems} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/categories" component={AllCategories} />
        <Route path="/categories/:categoryId" component={SingleCategory} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/new-product" component={NewProduct} />
        <Route path="/new-category" component={NewCategory} />
        <Route path="/checkout" component={Checkout} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/orders" component={AllOrders} />
              <Route path="/orders/:orderId" component={SingleOrder} />
              <Route exact path="/users" component={AllUsers} />
              <Route path="/users/:userId" component={UserEdit} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.currentUser.id,
    isAdmin: !!state.currentUser.id && state.currentUser.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(fetchInitialOrder());
      dispatch(fetchCartItems());
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
