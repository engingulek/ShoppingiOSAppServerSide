const mongoose = require('mongoose')

const CartListSchema = new mongoose.Schema({
    cartListUserId: {type:String,required:true},
    cartList : {type:Array,required:true},
  
    
})

module.exports = mongoose.model("CartList",CartListSchema)