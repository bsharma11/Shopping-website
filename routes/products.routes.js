const express = require('express')
const productcontroller = require('../controllers/product-controller')
const router = express.Router()

router.get('/products',productcontroller.getallproducts)

router.get('/products/:id',productcontroller.getproductdetails)

module.exports = router