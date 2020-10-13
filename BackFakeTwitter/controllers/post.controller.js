const dbManager = require("../database/db.manager");
const { deleteUserByUsername } = require("./user.controller");


/**
 * create a new post at db
 * @param {*} req 
 * @param {*} res 
 */
function createPost (req, res) {
    
    /**
     * validar request vacio
     */
    if(!req.body){
        res.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    }else{
    
        /**
         * creacion objeto con datos de entrada
         */
        const newReligionObject = {
            nombreReligion: req.body.nombreReligion,
            descripcionReligion: req.body.descripcionReligion,
            imagenReligion: req.body.imagenReligion
        }
    
        /**
         * insert nueva religion
         */
        dbManager.Religion.create(newReligionObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "La religion ya existe"
                });
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


/**
 * Delete all posts of database
 * @param {*} res informative message
 */
async function deleteAllPosts(req, res){

    try{
        const posts = await dbManager.Post.findAll();

        posts.forEach(post => {
            post.destroy()
        });

        res.send(
            {
                message: "All posts deleted"
            }
        );

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, delete all users"
            }
        );
    }
}


exports.createPost = createPost;

exports.getAllPosts = getAllPosts;

exports.findOnePostById = findOnePostById;

exports.updatePost = updatePost;

exports.deletePostByID = deletePostByID;

exports.deleteAllPosts = deleteAllPosts;

