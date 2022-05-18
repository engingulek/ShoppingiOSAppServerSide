const express = require('express');
const CartList = require('../models/CartList');
const CartProductList = require('../models/CartProductList');

const router = express.Router();
var list = []
router.get("/getCartList",(req,res)=> {
    CartList.find()
    .then(cartList => {
        list = cartList

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
    console.log(req.body.cartList[0].cartProductId)
    CartList.find().then(cartList=>{
        console.log(cartList)
       var cartfilterList = cartList.filter(x=>x.cartListUserId != 'TestUserId')
       var cartProductFilterList = cartfilterList[0].cartList.filter(x=>x.cartProductId == req.body.cartList[0].cartProductId )
       console.log(cartProductFilterList)
       console.log(cartfilterList[0]._id)
      
    })
  
    

  
    /*if (req.body.cartListUserId != ""){
        console.log(req.body.cartList[0].cartProductId)
    }*/
   
   /*const cartList = new CartList({
        cartListUserId: req.body.cartListUserId,
        cartList : req.body.cartList,

    })
    cartList.save()
    res.json({
        success :1,
        message:"success"
    })*/
})

module.exports = router