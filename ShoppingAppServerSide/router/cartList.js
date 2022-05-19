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
    
    CartList.find().then(cartList=>{
        //console.log(cartList)
        // Kullanıcını sepetini getirmektdit
       var cartfilterList = cartList.filter(x=>x.cartListUserId == req.body.cartListUserId)
       // sepetteki ürünler gelmektedir.

       ///Sepete tekrar tekrar eklenen ürün
       var cartProductFilterList = cartfilterList[0].cartList.filter(x=>x.cartProductId == req.body.cartList[0].cartProductId)
      // sepetteki diğer ürün
       var cartProductOrderFilterList = cartfilterList[0].cartList.filter(x=>x.cartProductId != req.body.cartList[0].cartProductId)

       if (cartProductFilterList.length == 0) {
           if (cartProductOrderFilterList.length == 0) {
               console.log("Sepette başka ürün bulunmamaktafır")
           }else{
               console.log("Sepette başka bir ürün bulunmaktadır")
               console.log(cartProductOrderFilterList[0])
           }
        
           // yeni eklenen ürün
           // req.body.cartList[0].cartProductId
           
           console.log("Ürün yeni eklendi")
       }else{
           // tekrar eklenen ürün olduğunda 

           if (cartProductOrderFilterList.length == 0) {
            console.log("Sepette başka ürün bulunmamaktafır")
        }else{
            console.log("Sepette başka bir ürün bulunmaktadır")
            console.log(cartProductOrderFilterList[0])
            var orderProductCartList = cartProductOrderFilterList[0]

            // tekrar eklenen ürünün güncellenmesi

            // tekrar eklenen ürün
            console.log("Tekrar eklenen ürün")
            //console.log(cartProductFilterList[0])

            var updateProduct = {
                cartProductImgUrl :  cartProductFilterList[0].cartProductImgUrl,
                cartProductPiece : cartProductFilterList[0].cartProductPiece + 1,
                cartProductName: cartProductFilterList[0].cartProductName,
                cartProductCategory : cartProductFilterList[0].cartProductCategory,
                cartProductPrice: cartProductFilterList[0].cartProductPrice,
                cartProductId : cartProductFilterList[0].cartProductId


            }

            
            console.log("Tekrar eklenen ürün güncellendi")
            console.log(updateProduct)
            console.log("Diğer ürün")
            console.log(orderProductCartList)

            console.log(cartfilterList[0]._id)
            console.log(cartfilterList[0].cartListUserId)

            var updateProductCartList = [updateProduct,orderProductCartList ]
            console.log("Güncellenen Sepet")
            

            console.log(cartList)

            var updateCartList = {
                _id : cartfilterList[0]._id,
                cartListUserId : cartfilterList[0].cartListUserId,
                cartList : updateProductCartList
            }
            console.log("Sepet güncellendi")
            console.log(updateCartList)

            

            CartList.findByIdAndUpdate(cartfilterList[0]._id,updateCartList)
            .then((cartList)=>{
                res.json({
                    cartList:updateCartList,
                    success:1
                })
            })
            .catch(err =>{
                res.json(err)
            }) 
            

            



        }
           
           console.log("Ürün tekrar eklendi")
       }
       
     
      
    })
  
    

 
})

module.exports = router