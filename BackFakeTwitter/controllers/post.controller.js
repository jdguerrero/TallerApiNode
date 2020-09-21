const dbManager = require("../database/db.manager");


/**
 * create a new user at db
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



exports.createPost = createPost;

