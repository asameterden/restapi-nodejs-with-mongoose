const express = require('express');
const router = express.Router();

const UserController = require ('../controllers/user');

router.post('/singup',UserController.user_singup);

router.post('/login',UserController.user_login);

module.exports=router;