const Products = require('../model/product_model');
const axios = require('axios')
exports.addProduct = (req,res) =>{
  
        console.log(req.body.Name ,req.body.Price ,  req.body.Category )
        console.log("Reached inside Add Product Function");
       
        const product =new Products({
            Name: req.body.Name,
            Price: req.body.Price,
            Category: req.body.Category
        })


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

   

}

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Products.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                   res.send(data)
                   // res.render('AllProduct', { Products : response.data });
                       
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Products.find()
            .then(product => {
                //res.send(product)
                res.send(product)
//res.render('AllProduct',{ Products : product ,   user_email: req.session.user_email ,
                  //  user_adminCheck: req.session.user_adminCheck })
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


// Update a new idetified user by user id
exports.update = (req, res)=>{


    console.log('Reached here to update from id')
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    console.log(req.params.id)
    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update product with ${id}. Maybe product not found!`})
            }else{
              //  res.render('AllProduct', { Product : product  } )
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update product information"})
        })
}


exports.delete = (req, res)=>{
    const id = req.params.id;

    Products.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Product was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
