import React, { Component } from 'react';
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
          <div className="section-header">
            <div className="title-box color-darkred"><h2>All Orders</h2></div>
          </div>
          <div className="order">
            <div className="order-details col-xs-2"><h4>EMAIL</h4></div>
            <div className="order-details col-xs-2"><h4>ADDRESS</h4></div>
            <div className="order-details col-xs-2"><h4>STATUS</h4></div>
            <div className="order-details col-xs-2"><h4>DATE CREATED</h4></div>
          </div>
          {allOrders.map(order => {
            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
              <div className="order">
                  <div className="order-details col-xs-2">{order.email}</div>
                  <div className="order-details col-xs-2">{order.shippingAddress}</div>
                  <div className="order-details col-xs-2">{order.status}</div>
                  <div className="order-details col-xs-2">{order.orderDate.slice(0, 10)}</div>
                <button className="btn btn-success order-details">Edit Order</button>
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

