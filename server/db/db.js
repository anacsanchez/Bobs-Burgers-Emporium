const Sequelize = require('sequelize')

const { DB_HOST, DB_PASS, DB_USER, DB_NAME } = process.env;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`);

module.exports = db
