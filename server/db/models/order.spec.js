
/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const LineItem = db.model('lineItem')
const Product = db.model('product')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('hooks: ', () => {
      let testOrder
      let testProduct

      beforeEach(() => {

        return Product.create({
          name: 'Beet Burger',
          description: 'beets, brown rice, black beans',
          price: 5.00,
          inventory: 5
        })
        .then(product => {
          return Order.create({
            status: 'Pending',
            email: 'ginny@hogwarts.edu',
            shippingAddress: 'Hogwarts Castle, Cardiff, Wales 02139'
          })
          .then(order => {
            testOrder = order;
            testOrder.update({status: 'Created'})
            return LineItem.create({
              quantity: 2, currentPrice: 3.00, totalPrice: 6.00, orderId: order.id, productId: 1
          })
          .then(lineItem => {
            return Product.findById(lineItem.productId)
          })
          .then(updatedProduct  => {
            testProduct = updatedProduct
          })
        })
      })
    })

      describe('the beforeUpdate order hook works correctly', () => {
        it('correctly decrements product inventory after order is created', () => {
            expect(testProduct.inventory).to.equal(3)
        })
      })
    })
  })
