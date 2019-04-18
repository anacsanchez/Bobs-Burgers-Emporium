const Sequelize = require('sequelize')
require('../../secrets')

const db = new Sequelize(process.env.DATABASE_URL, { logging: false })

module.exports = db
