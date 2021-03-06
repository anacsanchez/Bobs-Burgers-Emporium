import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app';
import {StripeProvider} from 'react-stripe-elements';


ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_lFHpwlDBijuzRHQyOsR2eh8r">
      <Router history={history}>
        <App />
      </Router>
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
)
