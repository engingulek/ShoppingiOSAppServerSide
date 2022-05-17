const express = require('express');
const CartList = require('../models/CartList');

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

module.exports = router