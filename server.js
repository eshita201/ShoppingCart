const express = require('express');
const bodyparser = require('body-parser');
const dotenv =require('dotenv');
const path = require('path');
const app=express();
const connectDB =require('./server/database/connection')
var mongoose = require('mongoose');
const controller=require('./server/controller/controller')
const product_controller=require('./server/controller/product_controller')
const auth=require('./server/middleware/auth')
const services=require('./server/services/render')
const axios = require('axios')
const Products = require('./server/model/product_model');
const multerInstance = require('./server/config/multer_file');
const session = require('express-session')
const { render } = require('ejs')


app.use(require("express-session")({
    secret: "ShopClose",
    resave: true,
    saveUninitialized: true
}));
app.use(session({secret: process.env.sessionSecret}))

app.use(bodyparser.urlencoded({extended: true}))
dotenv.config({path : 'config.env' })
const PORT = process.env.PORT || 8080
app.set("view engine","ejs")

app.use('/files', express.static("files"));
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

connectDB();

app.get('/',(req,res)=>{res.render('login')})
app.get('/login',auth.isLogOut,(req,res)=>{res.render('login')})
app.get('/register',auth.isLogOut,(req,res)=>{res.render('register')})
app.get('/index',auth.isLogin,controller.find)
app.get('/changepassword',auth.isLogOut,(req,res)=>{res.render('changepassword')})
app.post('/login', controller.login )
app.post('/register', controller.register )
app.get('/logout',auth.isLogin, controller.logout )
app.post('/changepassword', controller.changepassword )
app.get('/AddProduct',auth.isLogin,(req,res)=>{res.render('AddProduct', { 
    user_id: req.session.user_id ,user_adminCheck: req.session.user_adminCheck, user_email: req.session.user_email   })})
app.get('/AllProduct',auth.isLogin,services.all_product)
app.get('/api/products',product_controller.find);
app.get('/UpdateProduct',auth.isLogin,services.update_product)
app.put('/api/products/:id',product_controller.update);
app.delete('/api/products/:id', product_controller.delete);
app.post('/api/producttocart/:id',product_controller.AddProductstoCart);
app.get('/GotoCart',product_controller.GotoCart);
app.get('/displayCart',(req,res)=>{res.render('DisplayCart')});    
app.post('/AddProduct',multerInstance.upload.single('image'),(req,res) =>{
 
         console.log("Reached inside Add Product Function " , req.file.path , " ");      
 
         const product =new Products({
             Name: req.body.Name,
             Price: req.body.Price,
             Category: req.body.Category,
             Image: req.file.path
         });

         
     if(!req.body){
             console.log("Reached inside Add Product  Function 18");
             res.status(400).send({ message : "Content can not be emtpy!"});
             return;
         }
         product.save().then(product=>{
             res.redirect('/AllProduct');
         })
         .catch(err=>{
             res.json({
                 message: err.message || "Some error occurred while adding the product"
             })
         })
})



app.listen(PORT,()=>{console.log(`App is running on  http://localhost:${PORT} `)})


