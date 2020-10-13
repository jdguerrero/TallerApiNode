var express = require('express');
var router = express.Router();


const tweetController = require("../controllers/tweet.controller")



router.post('/', tweetController.createTweet);

router.get('/', tweetController.getAllTweets);

router.get('/findId/:idTweet', tweetController.findTweetById);

router.get('/findUN/:username', tweetController.findAllTweetsByUsername);

router.put('/', tweetController.updateTextTweet);

router.delete('/deleteID/:idTweet', tweetController.deleteTweetById);

module.exports = router;
