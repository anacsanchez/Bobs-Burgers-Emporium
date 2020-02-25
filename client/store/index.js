import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allCategories from './allCategories';
import allOrders from './allOrders';
import allProducts from './allProducts';
import allReviews from './allReviews';
import allUsers from './allUsers';
import currentCategory from './currentCategory';
import currentOrder from './currentOrder';
import currentProduct from './currentProduct';
import currentReview from './currentReview';
import currentUser from './currentUser';
import userToEdit from './editUser';
import allCartItems from './allCartItems';
import axios from 'axios';
// axios.defaults.baseURL = '/burgers-emporium'

const reducer = combineReducers({
  allCategories,
  allOrders,
  allProducts,
  allReviews,
  allUsers,
  allCartItems,
  currentCategory,
  currentOrder,
  currentProduct,
  currentReview,
  currentUser,
  userToEdit
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './allCartItems'
export * from './allCategories'
export * from './allOrders'
export * from './allProducts'
export * from './allReviews'
export * from './allUsers'
export * from './currentCategory'
export * from './currentOrder'
export * from './currentProduct'
export * from './currentReview'
export * from './currentUser'
export * from './editUser'
