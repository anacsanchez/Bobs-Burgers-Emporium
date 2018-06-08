import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchInitialOrder, fetchCurrentProduct, deleteProduct, postOrder, postLineItem, addItemToCart, fetchCartItems } from '../store';
import { NewProduct, Reviews } from './index';

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const productId = Number(this.props.match.params.productId)
    this.props.fetchCurrentProduct(productId);
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
      productId: currentProduct.id,
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
    const { currentUser, currentProduct } = this.props;
    if (!currentProduct || currentProduct.id !== Number(this.props.match.params.productId)) return <div className="height-100 bg-gray"></div>; // the product id is invalid or the data isnt loaded yet

    if (this.state.isEditing) {
      return (
        <NewProduct product={this.state.currentProduct} handleEdit={this.handleEdit} />
      )
    }
     else {
      return (
      <div>
          <div className="page-header product-page-header">
            <div className="page-header-sidebar">
              <h2>{currentProduct.name}</h2>
            </div>
          </div>

        <div className="page-body bg-gray">
          <div className="single-page-content product-page">
            <img src={ currentProduct.imgUrl } />
              <div><b>Description:</b> {currentProduct.description}</div>
              <div><b>Price:</b> {currentProduct.price}</div>
              { currentProduct.inventory > 0
                ? <button className="btn btn-success button-margin" onClick={this.handleAdd}>Add To Cart</button>
                : <div> No burgers at the moment. Check back soon!</div>
              }
              { currentUser.isAdmin
                ? <div><div><b>Number of Burgers Remaining:</b>
                      {currentProduct.inventory}</div>
                    <button onClick={this.handleEdit} className="btn btn-warning button-margin">Edit Burger</button>
                    <button onClick={this.handleDelete} className="btn btn-danger button-margin">Delete Burger</button>
                  </div> : null
              }
              <div><b>Categories:</b>
                { currentProduct.categories && currentProduct.categories.map(category => {
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

const mapDispatch = { fetchInitialOrder, fetchCurrentProduct, deleteProduct, postLineItem, postOrder, fetchCartItems, addItemToCart }

export default connect(mapState, mapDispatch)(SingleProduct)
