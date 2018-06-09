const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://image.ibb.co/bwWAxn/peas_and_thank_you.png',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  getterMethods: {
    isAvailable() {
      return this.inventory > 0;
    }
  }
})

module.exports = Product

Product.prototype.decrement = function(quantity) {
  this.inventory = this.inventory - quantity;
  this.save();
}
