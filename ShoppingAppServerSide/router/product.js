const express = require('express')
const Product = require("../models/Products")
const router = express.Router();

router.get("/products",(req,res)=> {
    Product.find()
    .then(products => {
        res.json({
            productList : products,
            success : 1
        })
    })
    .catch(err =>{
        res.json(err)
    })
})

module.exports = router