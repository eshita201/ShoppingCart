const axios = require('axios');


exports.update_product =    (req, res) =>{
    axios.get('http://shoppingcartlogincrud.herokuapp.com/api/products', { params : { id : req.query.id }})
        .then(function(productData){
           
            res.render("UpdateProduct", { Product : productData.data})
        })
        .catch(err =>{
            res.send(err);
        })

}
exports.all_product = (req,res)=>{
        axios.get('http://shoppingcartlogincrud.herokuapp.com/api/products')
            .then(function(productData){
                res.render("AllProduct", { Products : productData.data})
            })
            .catch(err =>{
                res.send(err);
            })
}