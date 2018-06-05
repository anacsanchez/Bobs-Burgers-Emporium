import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentOrder, editOrder } from '../store'

class SingleOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCurrentOrder(this.props.match.params.orderId);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let status = event.target.status.value;
    let user = {
      id: this.props.currentOrder.id,
      status: status
    }
    this.props.editOrder(user);
  }

  render() {
    const { currentOrder } = this.props;
    if (!currentOrder) {
      return <div>Order loading...</div>
    } else {
      let lineItems = this.props.currentOrder.lineItems;
      if (!lineItems) {
        return (
          <div key={currentOrder.id} className="singleOrderContainer">
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
                <button className="btn btn-success" type="submit">Update</button>
              </form>
            </div>
            <div>email address: {currentOrder.email}</div>
            <div>order status: {currentOrder.status}</div>
            <div>Line items loading...</div>
          </div>
        )
      } else {
          let orderTotal = 0;
          return (
          <div>
            <div className="page-header">
              <h2>Order No. #{currentOrder.id}</h2>
            </div>
            <div className="page-body">
                <div className="single-page-content">
                  <h4> Order Details </h4>
                  <div><b>Email Address associated with this Order: </b>{currentOrder.email}</div>
                  {/* <div>order status: {currentOrder.status}</div> */}
                  <div><b>Order Date: </b>{currentOrder.orderDate && currentOrder.orderDate.slice(0, 10)}</div>
                  <div>
                    <div><b>Order Total: </b>{ lineItems.reduce((orderTotal, lineItem) => orderTotal + lineItem.totalPrice, 0) }</div>
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
                    </form>
                    <button className="btn btn-success button-fix" type="submit">Update</button>
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
                          <div><b>Price: </b>{lineItem.currentPrice}</div>
                          <div><b>Item Total: </b>{lineItem.totalPrice}</div>
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
const mapState = ({ allOrders, currentOrder }) => ({ allOrders, currentOrder })
const mapDispatch = { fetchCurrentOrder, editOrder }

export default connect(mapState, mapDispatch)(SingleOrder);
