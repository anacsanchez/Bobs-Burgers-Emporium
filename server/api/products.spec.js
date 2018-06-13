// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Product = db.model('product')
// const agent = request.agent(app);

// describe('Product routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/products/', () => {

//     beforeEach(() => {
//       return Product.bulkCreate([
//         {name: 'Beet Burger', description: 'beets, brown rice, black beans', price: 5.00, inventory: 5},
//         {name: 'Lamb Burger', description: 'baby lambs', price: 10.00, inventory: 3},
//         {name: 'Beef Burger', description: 'baby beef', price: 5.00, inventory: 5}
//       ])
//     })

//     it('GET /api/products/', () => {
//       return agent
//         .get('/api/products')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('array');
//           expect(res.body.length).to.equal(3)
//           expect(res.body[0].description).to.equal('beets, brown rice, black beans')
//         })
//     })

//     it('GET /api/products/:productId', () => {
//       return agent
//         .get('/api/products/2')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('object');
//           expect(res.body.description).to.equal('baby lambs')
//         })
//     })

//   })
// })
