import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteCategory, fetchCurrentCategory } from '../store'
import { NewCategory, AllProducts } from './index'

class SingleCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: this.props.currentCategory,
      isEditing: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const categoryId = Number(this.props.match.params.categoryId)
    this.props.fetchCurrentCategory(categoryId)
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.currentCategory !== oldProps.currentCategory) {
      this.setState({
        currentCategory: newProps.currentCategory
      })
    }
  }

  handleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleDelete (event) {
    event.preventDefault()
    this.props.deleteCategory(this.state.currentCategory.id)
  }

  render() {
    const currentCategory = this.state.currentCategory;
    const products = currentCategory.products || []
    if (!currentCategory) return <div />; // the product id is invalid or the data isnt loaded yet

    if (this.state.isEditing) {
      return (
        <NewCategory category={this.state.currentCategory} handleEdit={this.handleEdit} />
      )
    }

     else {
      return (
      <div>
        <div>
          <div className="page-header">
            <h2>{currentCategory.name}</h2>
            {this.props.currentUser.isAdmin && <div className="page-body">
              <button onClick={this.handleEdit} className="btn btn-warning new">Edit Category</button>
              <button onClick={this.handleDelete} className="btn btn-danger new">Delete Category</button>
              </div>}
          </div>
        </div>

          <div className="page-body wide-list">
            <AllProducts products={products} />
          </div>
      </div>
      )

    }
  }
}

const mapState = ({currentCategory, currentUser}) => {
  return {currentCategory, currentUser}
}

const mapDispatch = {fetchCurrentCategory, deleteCategory}

export default connect(mapState, mapDispatch)(SingleCategory)
