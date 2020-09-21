const dbManager = require("../database/db.manager");
const { deleteUserByUsername } = require("./user.controller");


/**
 * create a new post at db
 * @param {*} req 
 * @param {*} res 
 */
function createPost (req, res) {

    //check if the body is empty
    if(!req.body){
        response.status(400).send(
            {
                message: "Request body is empty!!!!"
            }
        );
        return;
    }


    //create a new post
    const newPost = {
        message: req.body.message,
        published_date: req.body.published_date,
    }


    //Executing the query of creation - INSERT the previous created object into the database
    dbManager.Post.create (newPost).then(
        data => {
            res.send(data);
        }
    
    ).catch(
        error => {
            console.log(error);
            res.status(500).send(
                {
                    message: "Some error...."
                }
            );
        }
    );
} 

/**
 * get all post at db
 * @param {*} req 
 * @param {*} res 
 */
async function getAllPosts (req, res) {

    try{

        //select * from post
        const posts = await dbManager.Post.findAll();
        res.json(
            {
                data: posts
            }
        );

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, listing users"
            }
        );
    }

}


/**
 * return the post identificated by id on request
 * @param {*} req idPost
 * @param {*} res post information
 */
async function findOnePostById(req, res){

    try{

        const {idPost} = req.params;

        const postFound = await dbManager.Post.findOne(
            {
                where : {
                    idPost: idPost
                }
            }
        );
        res.json(postFound);

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, find to user"
            }
        );
    }

}



/**
 * update a post by idPost
 * @param {*} req new data by post
 * @param {*} res post update
 */
async function updatePost(req, res){

    //check if the body is empty
    if(!req.body){
        response.status(400).send(
            {
                message: "Request body is empty!!!!"
            }
        );
        return;
    }

    try{

        const {idPost} = req.params;

        const postFound = await dbManager.Post.findOne(
            {
                where : {
                    idPost: idPost
                }
            }
        );

        const updatePost = {
            message: req.body.message,
            published_date: req.body.published_date
        }

        

        postFound.message = updatePost.message;
        postFound.published_date = updatePost.published_date;


        await postFound.save();

        

        res.json(postFound);

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, update to user"
            }
        );
    }

}


/**
 * delete post by idPost
 * @param {*} req idPost
 * @param {*} res information message
 */
async function deletePostByID(req, res){

    try{

        const {idPost} = req.params;

        const postFound = await dbManager.Post.findOne(
            {
                where : {
                    idPost: idPost
                }
            }
        );

        await postFound.destroy();

        res.send(
            {
                message: "User deleted"
            }
        );

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, deleted to user"
            }
        );
    }

}



exports.createPost = createPost;

exports.getAllPosts = getAllPosts;

exports.findOnePostById = findOnePostById;

exports.updatePost = updatePost;

exports.deletePostByID = deletePostByID;

