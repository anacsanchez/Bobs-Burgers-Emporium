import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../store'
import { AllProducts } from './index'

class AllCategories extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    return (
      <div className="page-body">
        <div className="section-column">
          <div className="column-border"><div className="inner-column-border">
            <div className="sidebar-header">
              <h2 className="header color-white">Filter </h2>
              {
                this.props.currentUser.isAdmin && <div>
                  <Link to="/new-category"> <button className="btn btn-success new">New Category </button></Link>
                  <Link to="/new-product"> <button className="btn btn-success new">New Product</button></Link>
                </div>
              }
              <h4 className="sub-header color-white">Explore burgers by category</h4>
            </div>
            {
              this.props.allCategories.map(category =>
                <Link to={`/categories/${category.id}`} key={category.id}>
                  <h4 className="category">{category.name}</h4>
                </Link>
              )
            }
        </div></div>
      </div>
      <AllProducts />
    </div>
    )
  }
}

const mapState = ({allCategories, currentUser}) => ({allCategories, currentUser})

const mapDispatch = dispatch => {
  return {
    fetchData: () => {
      dispatch(fetchCategories());
    }
  }
}

export default connect(mapState, mapDispatch)(AllCategories)
