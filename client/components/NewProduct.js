import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postProduct, editProduct } from '../store';


class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.product ? this.props.product.id : '',
      name: this.props.product ? this.props.product.name : '',
      url: this.props.product ? this.props.product.url : '',
      description: this.props.product ? this.props.product.description : '',
      price: this.props.product ? this.props.product.price : '',
      inventory: this.props.product ? this.props.product.inventory : '',
      categories: this.props.product ? this.props.product.categoryIds : []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [ event.target.name]: event.target.value})
  }

  handleCheckboxChange(event) {
    let newSelection = event.target.id;
    let newSelectionArray;

    if (this.state.categories.indexOf(newSelection) >= 0) {
      newSelectionArray = this.state.categories.filter(id => id !== newSelection)
    } else {
      newSelectionArray = [...this.state.categories, newSelection];
    }

      this.setState({ categories: newSelectionArray });
  }

    // this.setState({
    //   categories: [...this.state.categories, event.target.id]
    //   })
  // }

  handleSubmit(event) {
    event.preventDefault();

    const {id, name, url, description, price, inventory, categories} = this.state;
    const submittedProduct = {id, name, url, description, price, inventory, categories}
    if (this.state.id) {
      this.props.editProduct(submittedProduct)
      this.props.handleEdit()
    } else {
      this.props.postProduct(submittedProduct)
    }
  }

  render() {
    let completed = this.state.name && this.state.description && this.state.price;
    let disabled = !completed

    return (
      <div>
        <h3 className="form-page-header">Add/Edit Product</h3>
        <div>
        {disabled &&
          <div className="alert alert-warning">You must enter a product name, description, and price.</div>
          }
        </div>

        <form className="section-body" onSubmit={this.handleSubmit}>
          <div className="input-field">
          <label>Name:
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          </div>
          <div className="input-field">
          <label>URL:
            <input
              name="url"
              onChange={this.handleChange}
              value={this.state.url}
            />
          </label>
          </div>
          <div className="input-field">
          <label>Description:
            <br />
            <textarea
              name="description"
              rows="5"
              cols="40"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </label>
          </div>
          <div className="input-field">
          <label>Price:
            <input
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
              type="number"
              step="0.01"
              min="0"
            />
          </label>
          </div>
          <div className="input-field">
          <label>Inventory:
            <input
              name="inventory"
              onChange={this.handleChange}
              type="number"
              min="0"
              value={this.state.inventory}
            />
          </label>
          </div>
          <fieldset>
          <legend>Categories:</legend>
          <div className="checkboxes-list">
            {this.props.allCategories.map(category => {
                return (
                  <div className="checkbox-item" key={category.id}>
                  {/* event handler is grabbing whatever is on input. check the state in handle click to see if has a name property, if it does toggle the boolean, otherwise add it to*/}
                    <input onClick={this.handleCheckboxChange} type="checkbox" id={category.id} />
                    <label value={category.id}>{category.name}</label>
                  </div>
                )
              })}
            </div>
          </fieldset>
          <button className="btn btn-success" disabled={disabled}type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

const mapState = ({allCategories}) => ({allCategories})
const mapDispatch = {postProduct, editProduct}
export default connect(mapState, mapDispatch)(NewProduct)
