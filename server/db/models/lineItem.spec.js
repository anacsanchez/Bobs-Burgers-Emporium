/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineItem')
const Product = db.model('product');
const Order = db.model('order');

describe('Line Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('methods: ', () => {
      let testLineItem

      beforeEach(() => {
        return Order.create({
          email: "test@test.com",
          shippingAddress: "123 Test St",
          status: "Created",
        })
        .then(() => {
          return Product.create({
            name: 'beetBurger',
            description: 'a beet burger made by Bob',
            price: 4.00,
            inventory: 10
          })
        })
        .then(product => {
          return LineItem.create({
            quantity: 2,
            productId: product.id,
            orderId: 1
          })
          .then(createdLineItem => {
            return LineItem.findById(createdLineItem.id)
          })
          .then(afterCreateLineItem => {
            testLineItem = afterCreateLineItem;
          })
        })
      })

      describe('LineItem object was created successfully', () => {
        it('contains the correct quantity', () => {
          expect(testLineItem.quantity).to.equal(2)
        })
      })

      describe('afterCreate hook', () => {
        it('correctly stamps the price of the related product', () => {
          expect(testLineItem.currentPrice).to.equal(4.00)
        })
      })

      describe('getterMethod', () => {
        it('correctly returns the total price, multiplying price times quantity', () => {
          expect(testLineItem.totalPrice).to.equal(8)
        })
      })

    })
  })

