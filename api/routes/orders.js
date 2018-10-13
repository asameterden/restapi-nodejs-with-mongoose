const express = require('express');
const router = express.Router();

//list
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message : "Handling get requests to /orders"
    });
});

//show
router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : "Handling get requests to /orders/id"
    });
});

//create
router.post('/',(req,res,next)=>{
    const order = {
        productId:req.body.productId,
        quantity : req.body.quantity
    }
    res.status(200).json({
        message : "Order was Created",
        order : order
    });
});

//update
router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : "Handling get requests to orders update"
    });
});

//delete
router.delete('/:ordertId',(req,res,next)=>{
    res.status(200).json({
        message : "Handling get requests to products delete"
    });
});

module.exports=router;