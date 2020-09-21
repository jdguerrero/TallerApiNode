var express = require('express');
var router = express.Router();


const postController = require("../controllers/post.controller")



router.post('/', postController.createPost);


module.exports = router;
