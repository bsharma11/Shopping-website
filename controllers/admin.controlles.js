const Product = require("../models/product-model");
const Order = require("../models/order-model")

async function getproducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewproduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewproduct(req, res) {
  const product = new Product({
    ...req.body,
    img: req.file.filename,
  });
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}

async function getUpdateproduct(req, res, next) {
  try {
    const product = await Product.findbyId(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req,res,next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    })
    if (req.file){
        product.replaceimg(req.file.filename)
    }
    try{
        await product.save()
    }
    catch(error){
        next(error)
        return
    }
    res.redirect('/admin/products')  
    
}

async function deleteproduct(req,res,next){
    let product
    try{
        product= await Product.findbyId(req.params.id)
        await product.remove()
    }catch(error){
        next(error)
        return
    }
    // res.redirect('/admin/products') here we cannot redirect becasue we are using frontend to delete the posts and we send these 
    // types of requests just to stay on the same page and not redirect to any other page or the same page
    res.json({message:"Product Deleted"})
}
async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render('admin/orders/admin-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: 'Order updated', newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNewproduct: getNewproduct,
  getproducts: getproducts,
  createNewproduct: createNewproduct,
  getUpdateproduct: getUpdateproduct,
  updateProduct: updateProduct,
  deleteproduct:deleteproduct,
  getOrders: getOrders,
  updateOrder: updateOrder
};
