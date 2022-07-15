const mongoose=require('mongoose')

var cartSchema = mongoose.Schema({
    product : [{
        name: String,
        city: String
      }]
    ,
    pass:{
        type: String,
        required: true
    },
    isAdmin : String

})

const Users = mongoose.model('users',userSchema);
module.exports=Users