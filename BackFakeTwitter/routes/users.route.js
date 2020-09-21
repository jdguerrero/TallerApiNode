var express = require('express');
var router = express.Router();


const userController = require("../controllers/user.controller")


/* Post new User */
router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:idUser', userController.findOneUserById);

router.put('/:idUser', userController.updateUser);





module.exports = router;
