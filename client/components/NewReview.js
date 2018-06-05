import React, { Component } from 'react';

export default class NewReview extends Component {

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {rating, text} = evt.target;
    let review = {
      text: text.value,
      rating: rating.value,
      userId: this.props.user.id,
      productId: this.props.product.id
    }
    this.props.submitReview(review);
  }

  render() {
    return (
      <div>
        <label>Have an opinion? Share it below! </label>
        <form onSubmit={this.handleSubmit}>
        <label>Rating:
          <select name="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
        </label>
          <label>Comments:
            <br />
            <textarea
            name="text"
            rows="5"
            cols="40"
            />
          </label>
          <button className="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
