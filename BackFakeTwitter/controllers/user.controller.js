const dbManager = require("../database/db.manager");



/**
 * create a new user at db
 * @param {*} req 
 * @param {*} res 
 */
function createUser (req, res) {

    //check if the body is empty
    if(!req.body){
        response.status(400).send(
            {
                message: "Request body is empty!!!!"
            }
        );
        return;
    }


    //create a new object
    const newUserObject = {
        username: req.body.username,
        created_date: req.body.created_date
    }


    //Executing the query of creation - INSERT the previous created object into the database
    dbManager.User.create (newUserObject).then(
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
 * return all users in db
 * @param {*} req request http
 * @param {*} res response http
 */

async function getAllUsers (req, res) {

    try{

        //select * from users
        const users = await dbManager.User.findAll();
        res.json(
            {
                data: users
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
 * return the user identificated by id on request
 * @param {*} req id user
 * @param {*} res user information
 */
async function findOneUserById(req, res){

    try{

        const {idUser} = req.params;

        const userFound = await dbManager.User.findOne(
            {
                where : {
                    idUser: idUser
                }
            }
        );
        res.json(userFound);

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, find to user"
            }
        );
    }

}


/**
 * update a user by idUser
 * @param {*} req new data by user
 * @param {*} res user update
 */
async function updateUser(req, res){

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

        const {idUser} = req.params;

        const userFound = await dbManager.User.findOne(
            {
                where : {
                    idUser: idUser
                }
            }
        );

        const updateUser = {
            newUsername: req.body.username,
            newCreated_date: req.body.created_date
        }

        

        userFound.username = updateUser.newUsername;
        userFound.created_date = updateUser.newCreated_date;


        await userFound.save();

        

        res.json(userFound);

    }catch(error){
        res.status(500).send(
            {
                message: "Error in server, update to user"
            }
        );
    }

}




/**
 * delete user by username
 * @param {*} req username
 * @param {*} res information message
 */
async function deleteUserByUsername(req, res){

    try{

        const {username} = req.params;

        const userFound = await dbManager.User.findOne(
            {
                where : {
                    username: username
                }
            }
        );

        await userFound.destroy();

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
 * Delete all users of database
 * @param {*} res informative message
 */
async function deleteAllUsers(req, res){

    try{
        const users = await dbManager.User.findAll();

        users.forEach(user => {
            user.destroy()
        });

        res.send(
            {
                message: "All user deleted"
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


async function findAllUsersByCreatedDate(){

    try{

        const {created_date} = req.params;

        const users = await dbManager.User.findAll(
            {
                where: {
                    created_date: created_date
                }
            }
        );
        
        res.json(
            {
                data: users
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


exports.createUser = createUser;

exports.getAllUsers = getAllUsers;

exports.findOneUserById = findOneUserById;

exports.updateUser = updateUser;

exports.deleteUserByUsername = deleteUserByUsername;

exports.deleteAllUsers = deleteAllUsers;

exports.findAllUsersByCreatedDate = findAllUsersByCreatedDate;