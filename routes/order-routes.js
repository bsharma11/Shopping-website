const express = require('express')

const ordercontroller = require('../controllers/order-controller')
const router = express.Router()

router.post('/',ordercontroller.addorder)

router.get('/',ordercontroller.getorders)


module.exports = router 