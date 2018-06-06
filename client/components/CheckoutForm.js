import React, {Component} from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder(evt) {
    evt.preventDefault();
    const { email, address1, address2, city, state, zip } = evt.target;
    let order;
    this.props.order ? order = this.props.order : order = {};
    this.props.email ? order.email = this.props.email : order.email = email.value;
    order.shippingAddress = `${address1.value}, ${address2.value}, ${city.value}, ${state.value} ${zip.value}`;
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
        <p style={{fontWeight: 'bold', fontSize: '1.2em'}}>Shipping Address </p>
          <label>Address 1:</label><input type="text" name="address1" />
          <label>Address 2 (Optional):</label><input type="text" name="address2" />
          <label>City</label><input type="text" name="city" />
          <label>State</label>
          <select name="state">
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MI">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <br /><br />
          <label>Zip Code</label><input type="text" name="zip" />
          <br /><br />
          {
            !this.props.email ? <div><label>Email Address: </label><input type="email" name="email" /></div> : null
          }
          <br />
          <input type="submit" className="btn btn-success" value="Place Order" />
        </form>
        <ul>
          { products.map((product, i) => {
              total += (product.quantity * product.product.price);
              return <li key={i}><SingleItem lineItem={product} /></li>
            })
          }
          <br />
          <li><h4>Your Total: {total}</h4></li>
        </ul>
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

//  { lineItems.reduce((orderTotal, lineItem) => orderTotal + lineItem.totalPrice, 0)}


//  import React, { Component } from 'react';

// export default class CheckoutForm extends Component {
//   constructor(props) {
//     super(props);

//     this.handleOrder = this.handleOrder.bind(this);
//   }

//   handleOrder(evt) {
    // evt.preventDefault();
    // const { email, address1, address2, city, state, zip } = evt.target;
    // let order;
    // this.props.order ? order = this.props.order : order = {};
    //   // order.email = this.props.email;
    // this.props.email ? order.email = this.props.email : order.email = email.value;
    // order.shippingAddress = `${address1.value}, ${address2.value}, ${city.value}, ${state.value} ${zip.value}`;
    // order.status = 'Created';
    // console.log(order);
    // this.props.placeOrder(order);
//   }

//   render() {
//     const { products } = this.props;
//     let total = 0;
//     if (!products) { return <p>Cart is empty</p> }
//     return (
//       <div id="checkout-items">
//         <form id="checkout-form" onSubmit={this.handleOrder}>
        //   <p style={{fontWeight: 'bold', fontSize: '1.2em'}}>Shipping Address </p>
        //   <label>Address 1:</label><input type="text" name="address1" />
        //   <label>Address 2 (Optional):</label><input type="text" name="address2" />
        //   <label>City</label><input type="text" name="city" />
        //   <label>State</label>
        //   <select name="state">
        //     <option value="AL">Alabama</option>
        //     <option value="AK">Alaska</option>
        //     <option value="AZ">Arizona</option>
        //     <option value="AR">Arkansas</option>
        //     <option value="CA">California</option>
        //     <option value="CO">Colorado</option>
        //     <option value="CT">Connecticut</option>
        //     <option value="DE">Delaware</option>
        //     <option value="FL">Florida</option>
        //     <option value="GA">Georgia</option>
        //     <option value="HI">Hawaii</option>
        //     <option value="ID">Idaho</option>
        //     <option value="IL">Illinois</option>
        //     <option value="IN">Indiana</option>
        //     <option value="IA">Iowa</option>
        //     <option value="KS">Kansas</option>
        //     <option value="KY">Kentucky</option>
        //     <option value="LA">Louisiana</option>
        //     <option value="ME">Maine</option>
        //     <option value="MD">Maryland</option>
        //     <option value="MA">Massachusetts</option>
        //     <option value="MI">Michigan</option>
        //     <option value="MN">Minnesota</option>
        //     <option value="MI">Mississippi</option>
        //     <option value="MO">Missouri</option>
        //     <option value="MT">Montana</option>
        //     <option value="NE">Nebraska</option>
        //     <option value="NV">Nevada</option>
        //     <option value="NH">New Hampshire</option>
        //     <option value="NJ">New Jersey</option>
        //     <option value="NM">New Mexico</option>
        //     <option value="NY">New York</option>
        //     <option value="NC">North Carolina</option>
        //     <option value="ND">North Dakota</option>
        //     <option value="OH">Ohio</option>
        //     <option value="OK">Oklahoma</option>
        //     <option value="OR">Oregon</option>
        //     <option value="PA">Pennsylvania</option>
        //     <option value="RI">Rhode Island</option>
        //     <option value="SC">South Carolina</option>
        //     <option value="SD">South Dakota</option>
        //     <option value="TN">Tennessee</option>
        //     <option value="TX">Texas</option>
        //     <option value="UT">Utah</option>
        //     <option value="VT">Vermont</option>
        //     <option value="VA">Virginia</option>
        //     <option value="WA">Washington</option>
        //     <option value="WV">West Virginia</option>
        //     <option value="WI">Wisconsin</option>
        //     <option value="WY">Wyoming</option>
        //   </select>
        //   <br /><br />
        //   <label>Zip Code</label><input type="text" name="zip" />
        //   <br /><br />
        //   {
        //     !this.props.email ? <div><label>Email Address: </label><input type="email" name="email" /></div> : null
        //   }
        //   <br />
        //   <input type="submit" className="btn btn-success" value="Place Order" />
        // </form>
        // <ul>
        //   { products.map((product, i) => {
        //       total += (product.quantity * product.product.price);
        //       return <li key={i}><SingleItem lineItem={product} /></li>
        //     })
        //   }
        //   <br />
        //   <li><h4>Your Total: {total}</h4></li>
        // </ul>
//       </div>
//     )
//   }
// }

// const SingleItem = (props) => {
//   return  (
//      <div className="cart-item">
//        <p>{props.lineItem.product.name}</p>
//        <img src={props.lineItem.product.imgUrl} />
//        <p>Quantity: {props.lineItem.quantity}</p>
//        <p>Price: {props.lineItem.quantity * props.lineItem.product.price}</p>
//      </div>
//    )
//  }
