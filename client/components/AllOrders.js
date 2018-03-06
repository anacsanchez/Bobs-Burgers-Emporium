import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store'

class AllOrders extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchOrders();
  }

  render() {
    if (!this.props.allOrders.length) {
      return (
        <div>Orders loading...</div>
      )
    } else {
      const { allOrders } = this.props;
      return (
        <div>
          {allOrders.map(order => {
            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
              <div className="orderContainer col-xs-2">
                <div><p>Account email: {order.email}</p></div>
                <div><p>Shipping address: {order.shippingAddress}</p></div>
                <div><p>Order status: {order.status}</p></div>
                <div><p>Date placed: {order.date}</p></div>
              </div>
              </Link>
            )
          })}
        </div>
      )
    }
  }
}

// Container
const mapState = ({allOrders, currentOrder}) => ({ allOrders, currentOrder })
const mapDispatch = { fetchOrders }

export default connect(mapState, mapDispatch)(AllOrders);
