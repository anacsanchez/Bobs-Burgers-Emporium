import React, {Component} from 'react';
import {CardElement} from 'react-stripe-elements';

export default class PaymentForm extends Component {
  render() {
    return (
      <label>Card
        <CardElement />
        </label>
    )
  }
}
