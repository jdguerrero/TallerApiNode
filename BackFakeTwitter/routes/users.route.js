var express = require('express');
var router = express.Router();


const userController = require("../controllers/user.controller")


router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/findId/:idUser', userController.findOneUserById);

router.get('/findUN/:username', userController.findOneUserByUsername);

router.put('/', userController.updateUsername);

router.delete('/deleteID/:idUser', userController.deleteUserById);

router.delete('/deleteUN/:username', userController.deleteUserByUsername);

router.delete ('/deleteAll',userController.deleteAllUsers);


module.exports = router;
