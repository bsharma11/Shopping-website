const Cart = require('../models/cart-model')

function initializecart(req,res,next){
    let cart
    if (!req.session.cart){
        cart  = new Cart()
    }else{
        const sessioncart = req.session.cart
        cart = new Cart(sessioncart.items,sessioncart.totalquantity,sessioncart.totalprice)
    }
    res.locals.cart = cart
    next()
}

module.exports = initializecart