const express = require('express')
const router  = express.Router()
const admincontroller = require('../controllers/admin.controlles')
const imageuploadmiddleware = require('../middlewares/image-upload')

router.get('/products', admincontroller.getproducts)

router.get('/products/new', admincontroller.getNewproduct)

router.post('/products', imageuploadmiddleware, admincontroller.createNewproduct)

router.get('/products/:id',admincontroller.getUpdateproduct)

router.post('/products/:id', imageuploadmiddleware, admincontroller.updateProduct)

router.delete('/products/:id', admincontroller.deleteproduct)

router.get('/orders', admincontroller.getOrders);

router.patch('/orders/:id', admincontroller.updateOrder);

module.exports = router