const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders')

//list
router.get('/',checkAuth,OrdersController.orders_get_all);

//show
router.get('/:orderId',checkAuth , OrdersController.orders_get_order);

//create
router.post('/',checkAuth , OrdersController.orders_create_order);

//delete
router.delete('/:ordertId',checkAuth, OrdersController.orders_delete_order);

module.exports=router;