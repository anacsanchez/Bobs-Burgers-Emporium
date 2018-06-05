const router = require('express').Router()
const {LineItem, Order} = require('../db/models')
const {isLoggedIn, isAdmin, makeError} = require('../../utils.js')
module.exports = router

router.param('orderId', (req, res, next, id) => {
  Order.findById(id, {include: [{ all: true, include: [{all: true}] }]})
  .then(order => {
    if (!order) { throw Error }
    else { req.order = order; }
    next();
  })
  .catch(next);
})

// get all orders & get, update, and post a single order
router.get('/', (req, res, next) => {
  if (!req.user) { return 'not logged in' }
  if (req.user.isAdmin) {
    Order.findAll({include: [{ all: true, include: [{all: true}] }]})
    .then(orders => {
      res.json(orders)
    } )
    .catch(next)
  } else {
    Order.findAll({
      where: { userId: req.user.id},
      include: [{ all: true, include: [{all: true}] }]
    })
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
  }
});

// router.get('/', isLoggedIn, (req, res, next) => {
//   // let query = req.user.isAdmin ? {} : {where: {userId: req.user.id}}
//   Order.find({
//       where: { userId: req.user.id, status: 'Pending'},
//       include: [{ all: true }]
//     })
//   .then(order => {
//     res.json(order);
//   })
// });

//For Testing purposes due to logged in requirement - AS
router.get('/:orderId', (req, res, next) => {
  //if (order.userId !== req.userId) return next(makeError('403', 'Forbidden'));
  req.order.reload({include: [{ all: true, include: [{all: true, include:[{all: true}]}] }]})
  .then(order => {
    res.json(order)
  })
  .catch(next)
});

// router.get('/:orderId', isLoggedIn, (req, res, next) => {
//   Order.findById(req.params.orderId, {include: [{ all: true }]})
//     .then(order => {
//       if (!order) {
//         return next(makeError('404', 'Not Found'))
//       } else {
//         if (order.userId !== req.userId) return next(makeError('403', 'Forbidden'));
//         res.json(order);
//       }
//     })
//     .catch(next)
// });


router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => res.json(order))
  .catch(next)
})

router.put('/:orderId', isLoggedIn, (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(foundOrder => foundOrder.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next)
})
  // Order.update(req.body, {
  //   where: {id: req.params.orderId},
  //   returning: true
  // })
  // .spread((updatedRowCount, updatedRows) => {
  //   res.json(updatedRows[0])
  // })
  // .catch(next)


router.delete('/:orderId', isLoggedIn, isAdmin, (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// post, update, and delete line items within an order
router.post('/:orderId/lineItems', (req, res, next) => {
  console.log(req.body);
  LineItem.bulkCreate(req.body)
  .then(lineItems => {
    console.log(lineItems);
    req.order.reload({include: [{ all: true, include: [{all: true}] }]})
    res.json(lineItems)
  })
  .catch(next)
});

router.put('/:orderId/lineItems/:lineItemId', (req, res, next) => {
  LineItem.update(req.body, {
    where: {id: req.params.lineItemId},
    returning: true
  })
  .spread((updatedRowCount, updatedRows) => {
    res.json(updatedRows[0])
  })
  .catch(next);
});

router.delete('/:orderId/lineItems/:lineItemId', (req, res, next) => {
  LineItem.destroy({ where: { id: req.params.lineItemId }})
    .then(() => res.sendStatus(204))
    .catch(next);
})
