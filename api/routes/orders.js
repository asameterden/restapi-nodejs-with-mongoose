const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order =  require('../models/order');
const Product = require('../models/product');

//list
router.get('/',(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count : docs.length,
            orders : docs.map(doc => {
                return {
                    _id : doc._id,
                    product : doc.product,
                    quantity : doc.quantity , 
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err=>{
        res.status(500).json({error : err});
    })
});

//show
router.get('/:orderId',(req,res,next)=>{
    Order.findById({_id : req.params.orderId})
    .exec()
    .then(order =>{
        res.status(200).json({order : order});
    })
    .catch(err => {
        res.status(500).json({error : err});
    });
});

//create
router.post('/',(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            res.status(404).json({
                message : "Product not found"
            });
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId,
        });
       return order.save()
    })
    .then(result =>{
        res.status(201).json({
            message:'Order stored',
            createdOrders : {
                _id : result._id,
                product : result.product,
                quantity : result.quantity,
                request :{
                    type : 'GET',
                    url : 'http://localhost:3000/orders/' + result._id

                }
            }
        });
    })
    .catch(err=>{
        res.status(500).json({error : err});
    });
});


//delete
router.delete('/:ordertId',(req,res,next)=>{
    Order.remove({_id :req.params.orderId})
    .exec()
    .then(res.status(200).json(result))
    .catch(err => {
        res.status(500).json({error : err});
    });
});

module.exports=router;