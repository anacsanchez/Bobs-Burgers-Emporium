import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCategory, editCategory } from '../store';

class NewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.category ? this.props.category.id : '',
      name: this.props.category ? this.props.category.name : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [ event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();

    const {id, name} = this.state;
    const submittedCategory = {id, name}

    if (this.state.id) {
      this.props.editCategory(submittedCategory)
      this.props.handleEdit()
    } else {
      this.props.postCategory(submittedCategory)
    }
  }

  render() {
    let completed = this.state.name;
    let disabled = !completed;

    return (
      <div>

        <div>
        {disabled &&
          <div className="alert alert-warning">You must enter a category name.</div>
          }
        </div>

        <form className="section-body"onSubmit={this.handleSubmit}>
        <div className="input-field">
          <label>Name:
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          </div>
          <button className="btn btn-success" disabled={disabled}type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

const mapState = ({allCategories, currentCategory}) => ({allCategories, currentCategory})
const mapDispatch = {postCategory, editCategory}
export default connect(mapState, mapDispatch)(NewCategory)
