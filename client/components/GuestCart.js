import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemToCart, deleteItemFromCart, fetchCartItems } from '../store';
import { CartDisplay } from './index';

class GuestCart extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
  }

  handleClick = () => {
    !this.state.visible ? this.setState({visible: true}) : this.setState({visible: false});
  }

  addCartItem = (lineItem) => {
    this.props.addItemToCart(lineItem.product);
  }

  reduceCartItem = (lineItem) => {
    this.props.deleteItemFromCart(lineItem.product);
  }

  render() {
    const {allCartItems} = this.props;
      return (
        <div className="cart-button">
          <button className="btn btn-danger white" onClick={this.handleClick}>Cart</button>
          {this.state.visible ? <CartDisplay hideCart={this.handleClick} products={allCartItems} handleAdd={this.addCartItem} handleReduce={this.reduceCartItem} /> : null}
        </div>
      )
    }
}

const mapState = ({ allCartItems }) => ({ allCartItems });

const mapDispatch = { addItemToCart, deleteItemFromCart, fetchCartItems };

export default connect(mapState, mapDispatch)(GuestCart);
