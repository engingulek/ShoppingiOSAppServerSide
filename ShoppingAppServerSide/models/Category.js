const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName : {type:String,required:true},
    categoryId : {type:Number,required:true},
  
    
})

module.exports = mongoose.model("Category",CategorySchema)