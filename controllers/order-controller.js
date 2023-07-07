const Orders = require('../models/order-model')
const User  =  require('../models/user-model')

async function getorders(req, res,next) {
    try {
      const orders = await Orders.findAllForUser(res.locals.uid);
      res.render('customer/orders/all-order', {
        orders: orders,
      });
    } catch (error) {
      next(error);
    }
  }
async function addorder(req,res,next){
    const cart = res.locals.cart
    let userDocument
    try{
        userDocument = await User.findbyId(res.locals.uid)
    }catch(error){
        return next(error)
    }
        const order = new Orders(cart,userDocument)
    try{
        await order.save()    
    }catch(error){
        return next(error)
    }

    req.session.cart = null
    
    
    res.redirect('/orders')
    
}

module.exports = {
    addorder:addorder,
    getorders:getorders
}