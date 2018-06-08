const Sequelize = require('sequelize')
const Product = require('./product');
const Order = require('./order');
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
}
})

//creating hook here causes it to run asynchronously
LineItem.hook("afterCreate", (lineItem, options) => {
  let product;
  return Product.find({where: { id: lineItem.productId} })
  .then((foundProduct) => {
    product = foundProduct;
    return LineItem.update({ currentPrice: foundProduct.price }, { where: { id: lineItem.id },
       transaction: options.transaction }
    )
  })
  .then(() => Order.find({where: {id: lineItem.orderId }}))
  .then(order => {
    if (order.status == "Created") {
      product.decrement(lineItem.quantity)
    }
  })
})

module.exports = LineItem
