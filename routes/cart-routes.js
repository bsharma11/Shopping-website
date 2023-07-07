const express = require('express')

const cartcontroller = require('../controllers/cart-controller')
const router = express.Router()

router.post('/items',cartcontroller.addcartitem)
router.get('/',cartcontroller.getCart)

router.patch('/items',cartcontroller.updatecartitem ) // patch method is used because we update part =s of the existing data

module.exports = router