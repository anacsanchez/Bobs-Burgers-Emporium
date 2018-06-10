import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postReview, deleteReview, fetchReviews, fetchCurrentProduct } from '../store';
import { NewReview } from './index';

class Reviews extends Component {

  handleClick = () => {
    this.props.postReview({text: 'hey', rating: 4, productId: 1});
  }

  submitReview = (review) => {
    this.props.postReview(review);
  }

  handleRemove = (review) => { this.props.deleteReview(review) }

  render() {
    const {currentProduct, currentUser} = this.props;
    if (!currentProduct.reviews) {return null}
    else {
      return (
      <div id="reviews-section">
        { Object.keys(currentUser).length
          ? <NewReview submitReview={this.submitReview} product={currentProduct} user={currentUser} />
          : null}
          {currentProduct.reviews && currentProduct.reviews.length
            ? <h4>Average Rating: {Math.round((currentProduct.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / currentProduct.reviews.length) * 10) / 10}</h4>
            : <h4> No ratings </h4>
          }
          <h3>All Ratings </h3>
          <div className="reviews-list">
        {
          currentProduct.reviews.length
          ? currentProduct.reviews.map(review => {
          return (
            <ul className="list-item-medium note-item outer-border" key={review.id}>
              <p><b>Rating:</b> {review.rating}</p>
              <p><b>Comments:</b> {review.text}</p>
            {currentUser.isAdmin && <button onClick={() => this.handleRemove(review)}>-</button>}
            </ul>)
            })
          : <p>There are no reviews for this product</p>
          }
          </div>
      </div>
    )
    }
  }
}

const mapState = ({currentProduct, allReviews, currentReview, currentUser}) => ({ currentProduct, allReviews, currentReview, currentUser })

const mapDispatch = {fetchCurrentProduct, fetchReviews, postReview, deleteReview};

export default connect(mapState, mapDispatch)(Reviews);
