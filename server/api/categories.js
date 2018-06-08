const router = require('express').Router()
const { Category } = require('../db/models')
const { isAdmin } = require('../../utils.js')

module.exports = router

//we need to leave these get requests unauthenticated because of displaying all
//categories on landing/product pages, right?
router.get('/', (req, res, next) => {
  Category.findAll({ include: [{ all: true }] })
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId, {include: [{ all: true, include: [{all: true}] }]})
    .then(category => res.json(category))
    .catch(next)
})

router.put('/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then(category => category.update(req.body))
    .then(category => res.json(category))
    .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next)
})

router.delete('/:categoryId', isAdmin, (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.categoryId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})
