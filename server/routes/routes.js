const express=require('express')
const controller=require('../controller/controller')
const product_controller=require('../controller/product_controller')
const auth=require('../middleware/auth')
const services=require('../services/render')
const routes = express.Router()
const axios = require('axios')
const Products = require('../model/product_model');
/////////////////////////////////////////////////////////////////////////////////////////////
//const config1= require('../config/config1')
const session = require('express-session')
const { render } = require('ejs')
const { eventNames } = require('../model/product_model')
routes.use(session({secret: process.env.sessionSecret}))
///////////////////////////////Session Management /////////////////////////////////////////
routes.get('/',(req,res)=>{res.render('login')})
routes.get('/login',auth.isLogOut,(req,res)=>{res.render('login')})
routes.get('/register',auth.isLogOut,(req,res)=>{res.render('register')})
routes.get('/index',auth.isLogin,controller.find)
routes.get('/changepassword',auth.isLogOut,(req,res)=>{res.render('changepassword')})

routes.post('/login', controller.login )
routes.post('/register', controller.register )
routes.get('/logout',auth.isLogin, controller.logout )
routes.post('/changepassword', controller.changepassword )

//////////////////////////////////////Session Management /////////////////////////////////////////

//////////////////////////////////////Product Management /////////////////////////////////////////




routes.get('/AddProduct',auth.isLogin,(req,res)=>{res.render('AddProduct', { 
    user_id: req.session.user_id ,user_adminCheck: req.session.user_adminCheck, user_email: req.session.user_email   })})
routes.post('/AddProduct',product_controller.addProduct)

routes.get('/AllProduct',auth.isLogin,services.all_product)
routes.get('/api/products', product_controller.find);


routes.get('/UpdateProduct',auth.isLogin,services.update_product)
routes.put('/api/products/:id', auth.isLogin,product_controller.update);

routes.delete('/api/products/:id',auth.isLogin, product_controller.delete);


/////////////////////////////Product Management ////////////////////////////////////////////////







module.exports = routes

