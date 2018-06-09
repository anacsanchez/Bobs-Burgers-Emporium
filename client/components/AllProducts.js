import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories, fetchCurrentCategory } from '../store';

// Component
class AllProducts extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const displayProducts = this.props.categoryProducts
    ? this.props.categoryProducts
    : this.props.allProducts

    return (
      <div id="products-list">
        <div className="section-header">
          {
            this.props.categoryProducts
            ? (
              <div>
                <h2 className="header">Burgers in this Category</h2>
                <h4 className="sub-header">{displayProducts.length} products</h4>
              </div>
              ) : (
              <div className="title-box">
                <h2> All Burgers</h2>
                <h4 className="sub-header">{displayProducts.length} products</h4>
              </div>
            )
          }
        </div>

        <div>
        {(displayProducts && displayProducts.length === 0)
        ? <h5>There are no burgers at this time. </h5>
        : <div className="container all-products">
          {displayProducts && displayProducts.map(product => {
            return (
                <div className="list-item" key={product.id}><div className="product"><div className="product-inner">
                <Link to={`/products/${product.id}`}>
                  <img className="thumbnail" src={ product.imgUrl } />
                  <div>
                    <div className="productName">{product.name}</div>
                    {this.props.currentUser.isAdmin && <div className="productInfo">
                        <p> Current Inventory: {product.inventory} </p>
                    </div>}
                    <div className="productInfo">
                      <p>Price: {product.price}</p>
                      {product.reviews && product.reviews.length
                      ? <p>Average Rating: {Math.round((product.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / product.reviews.length) * 10) / 10}</p>
                      : <p> No ratings </p>
                  }
                   </div>
                   </div>
                  </Link>
                </div></div></div>
              )
            })
          }
        </div>
        }
     </div>
    </div>
  )
  }
}

// Container
const mapState  = ({allProducts, currentUser, allCategories}, ownProps) => {
  return {
    categoryProducts: ownProps.products,
    allProducts,
    currentUser,
    allCategories
  }
}

const mapDispatch = dispatch => {
  return {
  fetchData: () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    },
  fetchCurrentCategory: (id) => {
    dispatch(fetchCurrentCategory(id))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
