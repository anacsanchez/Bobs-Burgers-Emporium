
/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as AllCategories} from './AllCategories';
export {default as AllOrders} from './AllOrders';
export {default as AllProducts} from './AllProducts';
export {default as AllUsers} from './AllUsers';
export {Login, Signup} from './AuthForm';
export {default as CartDisplay} from './CartDisplay'
export {default as Checkout} from './Checkout';
export {default as CheckoutForm} from './CheckoutForm';
export {default as GuestCart} from './GuestCart';
export {default as Navbar} from './Navbar';
export {default as NewCategory} from './NewCategory';
export {default as NewProduct} from './NewProduct';
export {default as NewReview} from './NewReview';
export {default as Reviews} from './Reviews';
export {default as SingleCategory} from './SingleCategory'
export {default as SingleOrder} from './SingleOrder';
export {default as SingleProduct} from './SingleProduct';
export {default as UserHome} from './UserHome';
export {default as UserCart} from './UserCart';
export {default as UserEdit} from './UserEdit';
