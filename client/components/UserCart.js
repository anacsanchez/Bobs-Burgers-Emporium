import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentOrder, editLineItem, deleteLineItem } from '../store';
import { CartDisplay } from './index';

class UserCart extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
  }

  handleClick = () => {
    !this.state.visible ? this.setState({visible: true}) : this.setState({visible: false});
  }

  addLineItem = (lineItem) => {
    const {currentOrder} = this.props;
    let newLineItem = {
      quantity: lineItem.quantity + 1,
      id: lineItem.id
    }

    this.props.editLineItem(currentOrder.id, newLineItem);
  }

  reduceLineItem = (lineItem) => {
    const {currentOrder} = this.props;
    if (lineItem.quantity === 1) {
      this.props.deleteLineItem(currentOrder.id, lineItem.id)
    }
    else {
      let newLineItem = {
        quantity: lineItem.quantity - 1,
        id: lineItem.id
      }
      this.props.editLineItem(currentOrder.id, newLineItem);
    }
  }

  render() {
    const {currentOrder} = this.props;
      return (
        <div className="cart-button">
          <button className="btn btn-danger white" onClick={this.handleClick}>Cart</button>
          {this.state.visible ? <CartDisplay hideCart={this.handleClick} products={currentOrder.lineItems} handleAdd={this.addLineItem} handleReduce={this.reduceLineItem} /> : null}
        </div>
      )
    }
}

const mapState = ({ currentOrder }) => ({ currentOrder });

const mapDispatch = { fetchCurrentOrder, editLineItem, deleteLineItem };

export default connect(mapState, mapDispatch)(UserCart);
