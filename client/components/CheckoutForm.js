import React, {Component} from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder(evt) {
    evt.preventDefault();
    const {email, shippingAddress} = evt.target;
    let order;
    if (this.props.order) {
      order = this.props.order;
    }
    else {
      order = {};
      order.email = email.value;
    }
    order.shippingAddress = shippingAddress.value;
    order.status = 'Created';
    this.props.placeOrder(order);
  }

  render() {
    const { products } = this.props;
    let total = 0;
    if (!products) { return <p>Cart is empty</p> }
    return (
      <div id="checkout-items">
        <form id="checkout-form" onSubmit={this.handleOrder}>
          {
            !this.props.email ? <div><label>Email Address: </label><input type="email" name="email" /></div> : null
          }
          <label>Shipping Address: </label><input type="text" name="shippingAddress" />
          <br /><br />
          <input type="submit" className="btn btn-success" value="Place Order" />
        </form>
        <ul>
          { products.map(product => {
              total += (product.quantity * product.product.price);
              return <li key={product.product.id}><SingleItem lineItem={product} /></li>
            })
          }
        </ul>
        <h4>Your Total: {total}</h4>
      </div>
    )
  }
}

const SingleItem = (props) => {
  return  (
     <div className="cart-item">
       <p>{props.lineItem.product.name}</p>
       <img src={props.lineItem.product.imgUrl} />
       <p>Quantity: {props.lineItem.quantity}</p>
       <p>Price: {props.lineItem.quantity * props.lineItem.product.price}</p>
     </div>
   )
 }

 { lineItems.reduce((orderTotal, lineItem) => orderTotal + lineItem.totalPrice, 0)}
