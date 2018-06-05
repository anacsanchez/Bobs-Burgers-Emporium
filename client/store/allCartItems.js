import axios from 'axios';

// action types
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS';
// const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
// const ADD_CART_ITEM = 'ADD_CART_ITEM';
// const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const RESET_CART_ITEMS = 'RESET_CART_ITEMS';

//commented out actions/reducers temporarily not in use - AS

// action creators
const getCurrentCartItems = cartItems => ({ type: GET_ALL_CART_ITEMS, cartItems });
// const removeCartItem = cartItem => ({ type: REMOVE_CART_ITEM, cartItem });
// const addCartItem = cartItem => ({ type: ADD_CART_ITEM, cartItem });
// const updateCartItem = cartItem => ({ type: UPDATE_CART_ITEM, cartItem });
const resetCartItems = () => ({type: RESET_CART_ITEMS})

// reducer
export default (cartItems = [], action) => {
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      return action.cartItems;
    // case REMOVE_CART_ITEM:
    //   return cartItems.filter(cartItem => cartItem.id !== action.id);

    // case ADD_CART_ITEM:
    //   return [...cartItems, action.cartItem]

    // case UPDATE_CART_ITEM:
    //   return cartItems.map(cartItem => (cartItem.product.id === action.cartItem.product.id ? action.cartItem : cartItem))
    case RESET_CART_ITEMS:
      return [];
    default:
      return cartItems;
  }
}

export const fetchCartItems = () => dispatch => {
  if (!window.sessionStorage.getItem('cartItems')) {
    return dispatch(getCurrentCartItems([]));
  }
  let lineItems = window.sessionStorage.getItem('cartItems').split(',');
  let cache = {};
  lineItems.forEach(lineItem => {
    if (cache[lineItem]) {
      cache[lineItem] = cache[lineItem] + 1;
    } else {
      cache[lineItem] = 1;
    }
  });
  Promise.all(Object.keys(cache).map(lineItem =>
    axios.get(`/api/products/${lineItem}`)
    .then(result => ({ productId: result.data.id, currentPrice: result.data.price, product: result.data, quantity: cache[result.data.id]}))))
  .then(createdLineItems => {
    dispatch(getCurrentCartItems(createdLineItems))
  })
}

export const emptyCart = () => dispatch => {
  console.log('you hit empty cart');
  window.sessionStorage.clear();
  dispatch(resetCartItems());
}

export const addItemToCart = (product) => dispatch => {
  if (!window.sessionStorage.getItem('cartItems')) {
    window.sessionStorage.setItem('cartItems', product.id);
  }
  else {
    let arrNew = window.sessionStorage.getItem('cartItems').split(',');
    arrNew.push(product.id);
    window.sessionStorage.setItem('cartItems', arrNew);
  }
  dispatch(fetchCartItems());
}

export const deleteItemFromCart = (cartItem) => dispatch => {
  let cartItems = window.sessionStorage.getItem('cartItems').split(',');
  let unwantedProduct = cartItems.indexOf(cartItem.id)
  cartItems.splice(unwantedProduct, 1);
  window.sessionStorage.setItem('cartItems', cartItems);
  dispatch(fetchCartItems());
}

