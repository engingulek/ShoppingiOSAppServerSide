const mongoose = require('mongoose')

const CartProductListSchema = new mongoose.Schema({
    cartProductId: {type:String,required:true},
    cartproductName : {type:String,required:true},
    cartproductPrice : {type:Number,required:true},
    cartproductCategory: {type:Object,required:true},
    cartproductImgUrl:{type:String,required:true},
    cartproductPiece :{type:Number,required:true},
    
})

module.exports = mongoose.model("CartProduct",CartProductListSchema)