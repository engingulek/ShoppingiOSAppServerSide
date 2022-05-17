const express = require('express');
const CartList = require('../models/CartList');
const CartProductList = require('../models/CartProductList');

const router = express.Router();

router.get("/getCartList",(req,res)=> {
    CartList.find()
    .then(cartList => {
        res.json({
            cartList : cartList,
            success : 1
        })
    })
    .catch(err =>{
        res.json(err)
    })
})


router.post("/postCartList",(req,res)=>{
    console.log(req.body.cartListUserId)
    console.log(req.body.cartList)
   const cartList = new CartList({
        cartListUserId: req.body.cartListUserId,
        cartList : req.body.cartList,

    })
    cartList.save()
    res.json({
        success :1,
        message:"success"
    })
})

module.exports = router