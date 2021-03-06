
const mongoose = require('mongoose');
const Product = require('../models/product');

//list
exports.products_get_products = (req,res,next)=>{
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        if(docs.length>= 0){
            const response = {
                count : docs.length,
                products : docs.map(doc => {
                    return {
                        name :doc.name,
                        price : doc.price , 
                        productImage : doc.productImage,
                        _id : doc._id,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        }else {
            res.status(404).json({message : "No entries found"});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err});
    }); 
}

//store
exports.products_create_product = (req,res,next)=>{
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    });
    product
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message : "Created product succesfully",
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request :{
                    type : 'GET',
                    url : 'http://localhost:3000/products/' + result._id

                }
            }
        });
    })
    .catch(err=>{
        console.log(err);
    res.status(500).json({ error : err});
    });
}


//show
exports.products_get_product =(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc=>{
        console.log("From Database" + doc);
        if(doc){
            const response = {
                name : doc.name,
                price : doc.price,
                _id : doc._id,
                request : {
                    type : 'GET',
                    description : 'get all products',
                    url : 'http://localhost:3000/products/'
                }
            }
            res.status(200).json(response);
        }else{
            res.status(404).json({message : 'no valid entry fount for provided id'});
        } 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err});
    })
}


//update
exports.products_update_product =(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id },{$set:updateOps })
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err});
    });
}

//delete
exports.products_delete_product =(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id : id })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error : err});
    });
};