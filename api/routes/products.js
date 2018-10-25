const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function (req,file,cb){
            cb(null,new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage : storage});

const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

//list
router.get('/',ProductsController.products_get_products);

//store
router.post('/',checkAuth,upload.single('productImage'),ProductsController.products_create_product);

//show
router.get('/:productId',checkAuth , ProductsController.products_get_product);

//update
router.patch('/:productId',checkAuth, upload.single('productImage'),ProductsController.products_update_product);

//delete
router.delete('/:productId',checkAuth , ProductsController.products_delete_product);


module.exports=router;