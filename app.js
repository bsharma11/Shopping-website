const express = require("express");
const authRoutes = require("./routes/auth-routes");
const productsroutes = require("./routes/products.routes")
const baseroute = require("./routes/base.routes");
const adminroutes = require('./routes/admin.routes')
const protectRoutes = require('./middlewares/protect-routes')
const db = require("./data/database");
const path = require("path");
const app = express();
const csrf = require('csurf')
const expressSession = require('express-session')
const checkAuthstatus = require('./middlewares/check-auth')
const createsessionconfig = require('./config/session')
const addcsrftoken = require('./middlewares/csrftoken')
const handleErrors = require('./middlewares/error-handler')
const cartmiddleware =require('./middlewares/cart')
const cartRoutes = require('./routes/cart-routes')
const orderroutes = require('./routes/order-routes')
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notfoundmiddleware  = require('./middlewares/not-found')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // __dirname creates a path to the overall project folder
app.use(express.static("public"));
app.use('/products/assets', express.static("product-data"));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const sessionconfig = createsessionconfig()

app.use(expressSession(sessionconfig))
app.use(csrf())
app.use(addcsrftoken)
app.use(cartmiddleware)
app.use(updateCartPricesMiddleware)
app.use(checkAuthstatus)
app.use(baseroute)
app.use(productsroutes)
app.use(authRoutes); //app.use() is built in method that allows us to add a middleware that will be triggered for every incoming req
app.use('/cart',cartRoutes)

app.use('/orders',protectRoutes,orderroutes)
app.use('/admin', protectRoutes,adminroutes)
app.use(notfoundmiddleware)

app.use(handleErrors)

db.connecttodb()
  .then(function () {
    app.listen(3000); //to listen on port 3000
  })
  .catch(function (error) {
    console.log("Failed to connect to db");
    console.log(error);
  });
