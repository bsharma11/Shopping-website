const Product = require("../models/product-model");

async function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addcartitem(req, res) {
  let product;
  try {
    product = await Product.findbyId(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!!",
    newtotalitems: cart.totalquantity,
  });
}

function updatecartitem(req, res) {
  const cart = res.locals.cart;
  const updateitemdata = cart.updateitem(
    req.body.productId,
    +req.body.quantity
  );

  req.session.cart = cart;

  res.json({
    message: "Item Updated!",
    updatedcart:{
      newtotalprice: cart.totalprice,
      newtotalquantity: cart.totalquantity,
      UpdatedItemprice: updateitemdata.updateditemprice,
    },
  });
    
}

module.exports = {
  addcartitem: addcartitem,
  getCart: getCart,
  updatecartitem: updatecartitem,
};
