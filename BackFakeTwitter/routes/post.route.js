var express = require('express');
var router = express.Router();


const postController = require("../controllers/post.controller")



router.post('/', postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/:idPost', postController.findOnePostById);

router.put('/:idPost', postController.updatePost);

router.delete('/:idPost', postController.deletePostByID);



module.exports = router;
