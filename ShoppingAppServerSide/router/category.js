const express = require('express')
const Category = require("../models/Category")
const router = express.Router();

router.get("/categories",(req,res)=> {
    Category.find()
    .then(categories => {
        res.json({
            categoryList : categories,
            success : 1
        })
    })
    .catch(err =>{
        res.json(err)
    })
})


module.exports = router