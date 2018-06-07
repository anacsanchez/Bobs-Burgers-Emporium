const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  currentPrice: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
},
{ getterMethods: {
  totalPrice: function() {
    return this.getDataValue('currentPrice') * this.getDataValue('quantity');
    }
},
  hooks: {
    afterCreate: function(lineItem) {
        lineItem.getProduct()
        .then(product => {
          lineItem.currentPrice = product.price
          lineItem.save()
          lineItem.getOrder()
          .then(order => {
            if (order.status == "Created") {
              product.decrement(lineItem.quantity)
            }
          })
        })
    }
  }
})

module.exports = LineItem
