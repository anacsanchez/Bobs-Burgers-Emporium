import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editOrder, fetchOrders } from '../store'
import { formatPrice } from '../utils';

class SingleOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleSubmit = (event) => {
    console.log(event.target);
    event.preventDefault();
    const userOrder = this.props.allOrders.find(order => order.id == this.props.match.params.orderId);
    let status = event.target.status.value;
    let order = {
      id: userOrder.id,
      status: status
    }
    this.props.editOrder(order);
  }

  render() {
    const userOrder = this.props.allOrders.find(order => order.id == this.props.match.params.orderId);
    console.log(userOrder);
    // if (!Object.keys(userOrder).length) {
    if (!this.props.allOrders.length) {
      return <div>Order loading...</div>
    } else {
      let lineItems = userOrder.lineItems;
      if (!lineItems) {
        return (
          <div key={userOrder.id} className="singleOrderContainer">
            <div>
              <form className="section-body" onSubmit={this.handleSubmit}>
                <label>Status:
                  <select name="status">
                    <option value="Pending">Pending</option>
                    <option value="Created">Created</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
                <input type="submit" className="btn btn-success" value="Update" />
              </form>
            </div>
            <div>email address: {userOrder.email}</div>
            <div>order status: {userOrder.status}</div>
            <div>Line items loading...</div>
          </div>
        )
      } else {
          let orderTotal = 0;
          return (
          <div>
            <div className="page-header">
              <h2>Order No. #{userOrder.id}</h2>
            </div>
            <div className="page-body">
                <div className="single-page-content">
                  <h4> Order Details </h4>
                  <div><b>Email Address associated with this Order: </b>{userOrder.email}</div>
                  {/* <div>order status: {currentOrder.status}</div> */}
                  <div><b>Order Date: </b>{userOrder.orderDate && userOrder.orderDate.slice(0, 10)}</div>
                  <div>
                    <div><b>Order Total: </b>{ formatPrice(lineItems.reduce((orderTotal, lineItem) => orderTotal + lineItem.totalPrice, 0)) }</div>
                    <form className="section-body" onSubmit={this.handleSubmit}>
                    <div>
                      <b>Status: </b>
                      <select name="status">
                        <option value="Pending">Pending</option>
                        <option value="Created">Created</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                      </div>
                      <input type="submit" value="Update" className="btn btn-success button-fix" />
                    </form>

                  </div>
                </div>
                <div>
                  <h4>Order Line Items </h4>
                  {lineItems.map(lineItem => {
                      return (
                        <div key={lineItem.id} className="lineItem">
                        { console.log(lineItem) }
                          <div><b>Name: </b> {lineItem.product.name}</div>
                          <div><b>Quantity: </b> {lineItem.quantity}</div>
                          <div><b>Price: </b>{ formatPrice(lineItem.currentPrice) }</div>
                          <div><b>Item Total: </b>{ formatPrice(lineItem.totalPrice) }</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
          </div>
        )
      }
    }
  }
}

// Container
const mapState = ({ allOrders }) => ({ allOrders })
const mapDispatch = { editOrder, fetchOrders }

export default connect(mapState, mapDispatch)(SingleOrder);
