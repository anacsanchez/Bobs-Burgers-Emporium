/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleProduct from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let singleProduct
  let beetBurger = {name: 'Beet Burger', description: 'beets, brown rice, black beans', price: 5.00, inventory: 5, categories: [1, 3, 5]}

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct currentProduct= {beetBurger} />)
  })

  it('renders the product name in a h2', () => {
    expect(singleProduct.find('h2').text()).to.be.equal('Beet Burger')
  })

  it('should contain a list of categories ', () => {
    expect(singleProduct.find('ul').length()).to.equal(3)
    expect(singleProduct.find('ul'))[0].to.be.equal('test')
});
})
