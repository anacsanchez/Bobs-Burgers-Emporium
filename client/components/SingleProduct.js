import React, {Component} from 'react'
import NewProduct from './NewProduct';
import {connect} from 'react-redux';
import {fetchCurrentProduct, deleteProduct, postOrder, postLineItem, addItemToCart, fetchCartItems} from '../store';
import Reviews from './Reviews';
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: this.props.currentProduct,
      isEditing: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchCurrentProduct(productId)
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.currentProduct !== oldProps.currentProduct) {
      this.setState({
        currentProduct: newProps.currentProduct
      })
    }
  }

  handleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleDelete (event) {
    event.preventDefault()
    this.props.deleteProduct(this.state.currentProduct.id)
  }

  handleAdd(event) {
    event.preventDefault();
    const {currentProduct, currentOrder, currentUser} = this.props;
    let newLineItem = {
      quantity: 1,
      productId: currentProduct.id
    }
    if (!Object.keys(currentUser).length) {
      this.props.addItemToCart(currentProduct);
    }

    else if (!Object.keys(currentOrder).length) {
      this.props.postOrder({status: 'Pending', userId: currentUser.id}, [newLineItem]);
    }

    else {
      newLineItem.orderId = currentOrder.id;
      this.props.postLineItem(currentOrder.id, [newLineItem]);
    }
  }

  render() {
    const currentUser = this.props.currentUser;
    const currentProduct = this.state.currentProduct;
    if (!currentProduct) return <div />; // the product id is invalid or the data isnt loaded yet

    if (this.state.isEditing) {
      return (
        <NewProduct product={this.state.currentProduct} handleEdit={this.handleEdit} />
      )
    }

     else {
      return (
      <div>
        <div>
          <div className="page-header">
          <div className="page-header-sidebar">
            <h2>{currentProduct.name}</h2>
          </div>
            </div>
        </div>

        <div className="page-body">
          <div className="single-page-content product-page">
          <img src={ currentProduct.imgUrl } />
            <h4> Burger Details </h4>
              <div><b>Description:</b> {currentProduct.description}</div>
              <div><b>Price:</b> {currentProduct.price}</div>
              { currentProduct.inventory > 0
                ? <div><b>Number of Burgers Remaining:</b> {currentProduct.inventory}</div>
                : <div> No burgers at the moment. Check back soon!</div> }
              { currentUser.isAdmin ? <div className="page-header-sidebar">
              <button className="btn btn-success button-fix button-margin" onClick={this.handleAdd}>Add To Cart</button>
              <button onClick={this.handleEdit} className="btn btn-warning button-fix button-margin">Edit Burger</button>
              <button onClick={this.handleDelete} className="btn btn-danger button-fix button-margin">Delete Burger</button>
              </div> : <button className="btn btn-success button-fix button-margin" onClick={this.handleAdd}>Add To Cart</button> }
                <div><b>Categories:</b> {currentProduct.categories && currentProduct.categories.map(category => {
                    return (
                      <Link to={`/categories/${category.id}`} key={category.id}>
                      <li>{category.name}</li>
                      </Link>
                      )
                    })
                  }
                  </div>
          </div>
        </div>
        <div>
          <Reviews />
        </div>
      </div>
      )
    }
  }
}

const mapState = ({ currentProduct, currentUser, currentOrder }) => ({ currentProduct, currentUser, currentOrder })

const mapDispatch = { fetchCurrentProduct, deleteProduct, postLineItem, postOrder, fetchCartItems, addItemToCart }

export default connect(mapState, mapDispatch)(SingleProduct)
