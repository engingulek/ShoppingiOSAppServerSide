const express = require("express");
const CartList = require("../models/CartList");
const CartProductList = require("../models/CartProductList");

const router = express.Router();
var list = [];
router.get("/getCartList", (req, res) => {
  CartList.find()
    .then((cartList) => {
      list = cartList;

      res.json({
        cartList: cartList,
        success: 1,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/postCartList", (req, res) => {
  CartList.find().then((cartList) => {
    //console.log(cartList)
    // Kullanıcını sepetini getirmektdit

    if (cartList.length == 0) {
      console.log("Sepet yeni oluşturuldu");
      console.log(req.body.cartList)
      console.log(req.body.cartListUserId)
      const cartList = new CartList({
        cartListUserId:req.body.cartListUserId,
        cartList : req.body.cartList
      })

      cartList.save()
      res.json({
        success:1,
        messsage:"success"
      })
    
    } 
    
    else {
      var cartfilterList = cartList.filter(
        (x) => x.cartListUserId == req.body.cartListUserId
      );
      // sepetteki ürünler gelmektedir.

      ///Sepete tekrar tekrar eklenen ürün
      var cartProductFilterList = cartfilterList[0].cartList.filter(
        (x) => x.cartProductId == req.body.cartList[0].cartProductId
      );
      // sepetteki diğer ürün
      var cartProductOrderFilterList = cartfilterList[0].cartList.filter(
        (x) => x.cartProductId != req.body.cartList[0].cartProductId
      );

      if (cartProductFilterList.length) {
        console.log("Sepete ürün tekrar eklenedi");
        // diğer ürünler
        //console.log(cartProductOrderFilterList)

        var updateCartProduct = {
          cartProductImgUrl: cartProductFilterList[0].cartProductImgUrl,
          cartProductPiece: cartProductFilterList[0].cartProductPiece + 1,
          cartProductName: cartProductFilterList[0].cartProductName,
          cartProductCategory: cartProductFilterList[0].cartProductCategory,
          cartProductPrice: cartProductFilterList[0].cartProductPrice,
          cartProductId: cartProductFilterList[0].cartProductId,
        };

        var newUpdateCartList = cartProductOrderFilterList;
        newUpdateCartList.push(updateCartProduct);

        var updateCartList = {
          _id: cartfilterList[0]._id,
          cartListUserId: cartfilterList[0].cartListUserId,
          cartList: newUpdateCartList,
        };

        console.log(updateCartList);
        CartList.findByIdAndUpdate(cartfilterList[0]._id, updateCartList)
          .then((cartList) => {
            res.json({
              cartList: updateCartList,
              success: 1,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        console.log("Ürün sepete yeni eklnedi");
        // console.log(cartProductOrderFilterList)
        var updateNewProductCartList = cartProductOrderFilterList;
        //updateNewProductCartList.cartList.push(req.body.cartList)
        //console.log(updateNewProductCartList)
        //console.log(req.body.cartList[0])
        updateNewProductCartList.push(req.body.cartList[0]);

        var updateCartList = {
          _id: cartfilterList[0]._id,
          cartListUserId: cartfilterList[0].cartListUserId,
          cartList: updateNewProductCartList,
        };

        CartList.findByIdAndUpdate(cartfilterList[0]._id, updateCartList)
          .then((cartList) => {
            res.json({
              cartList: updateCartList,
              success: 1,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    }
  });
});


router.post("/productPieceIncDec", (req, res) => {


  CartList.find().then((cartList)=>{
    var cartfilterList = cartList.filter(
      (x) => x.cartListUserId == req.body.userId
    );
    // işlem yapılacak ürün
    var cartProductFilterList = cartfilterList[0].cartList.filter(
      (x) => x.cartProductId == req.body.cartProductId
    );
    // sepetteki diğer ürün
    var cartProductOrderFilterList = cartfilterList[0].cartList.filter(
      (x) => x.cartProductId != req.body.cartProductId
    );

    var updateCartProduct = {}
      if (req.body.type == "inc") {
        updateCartProduct = {
          cartProductImgUrl: cartProductFilterList[0].cartProductImgUrl,
          cartProductPiece: cartProductFilterList[0].cartProductPiece + 1,
          cartProductName: cartProductFilterList[0].cartProductName,
          cartProductCategory: cartProductFilterList[0].cartProductCategory,
          cartProductPrice: cartProductFilterList[0].cartProductPrice,
          cartProductId: cartProductFilterList[0].cartProductId,
        };

  }else if (req.body.type  == "dec"){
    updateCartProduct = {
      cartProductImgUrl: cartProductFilterList[0].cartProductImgUrl,
      cartProductPiece: cartProductFilterList[0].cartProductPiece - 1,
      cartProductName: cartProductFilterList[0].cartProductName,
      cartProductCategory: cartProductFilterList[0].cartProductCategory,
      cartProductPrice: cartProductFilterList[0].cartProductPrice,
      cartProductId: cartProductFilterList[0].cartProductId,
    };

  }else{
    console.log("Error")
  }

  

  var newUpdateCartList = cartProductOrderFilterList;
        newUpdateCartList.push(updateCartProduct);

        var updateCartList = {
          _id: cartfilterList[0]._id,
          cartListUserId: cartfilterList[0].cartListUserId,
          cartList: newUpdateCartList,
        };

        console.log(updateCartList);
        CartList.findByIdAndUpdate(cartfilterList[0]._id, updateCartList)
          .then((cartList) => {
            res.json({
              cartList: updateCartList,
              success: 1,
            });
          })
          .catch((err) => {
            res.json(err);
          });



    
    
  

  })





 
});

module.exports = router;
