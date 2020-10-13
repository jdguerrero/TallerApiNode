const { User } = require("../database/db.manager");
const dbManager = require("../database/db.manager");



/**
 * create a new user at db
 * @param {*} req 
 * @param {*} res 
 */
function createUser(req, res) {

    /**
     * validar request vacio
     */
    if (!req.body) {
        res.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    } else {

        /**
         * creacion objeto con datos de entrada
         */
        const newUser = {
            username: req.body.username,
            created_date: req.body.created_date
        }

        /**
         * insert nuevo Usuario
         */
        dbManager.User.create(newUser).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "El usuario ya existe"
                });
            }
        );
    }
}


/**
 * return all users in db
 * @param {*} req request http
 * @param {*} res response http
 */

async function getAllUsers (req, res) {

    try {
        const users = await dbManager.User.findAll();
        res.json(
            {
                data: users
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar usuarios"
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

        if(!userFound){
            res.send({
                message: "El usuario no existe"
            });
        }else{
            res.json(userFound);
        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error al encontrar usuario"
            }
        );
    }

}

/**
 * return the user identificated by id on request
 * @param {*} req id user
 * @param {*} res user information
 */
async function findOneUserByUsername(req, res){

    try{

        const {username} = req.params;

        const user = await dbManager.User.findOne(
            {
                where: {
                    username: username
                }
            }
        );

        if(!user) {
            res.send(
                {
                    message:"El usuario no existe"
                }
            );
        }else{
            res.json(user);
        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al buscar usuario"
            }
        );
    }

}


/**
 * Elimina un usuario por su idUser
 * @param {*} req idUser de la religion que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteUserById(req, res){

    try{

        const {idUser} = req.params;

        const user = await dbManager.User.findOne(
            {
                where: {
                    idUser: idUser
                }
            }
        );

        if(!user) {
            res.send(
                {
                    message:"El usuario no existe"
                }
            );
        }else{

            await User.destroy({
                where: {
                    idUser: idUser
                }
            });
    
            res.send(
                {
                    message:"Usuario Eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar usuario"
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

        const user = await dbManager.User.findOne(
            {
                where: {
                    username: username
                }
            }
        );

        if(!user) {
            res.send(
                {
                    message:"El usuario no existe"
                }
            );
        }else{

            await User.destroy({
                where: {
                    username: username
                }
            });
    
            res.send(
                {
                    message:"Usuario Eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar usuario"
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


/**
 * recibe un objeto JSon con la siguiente estructura
 {
  "idUser": 1,
  "username": null
}
 * se identifica el usuario que se desea cambiar con el idUser
 * username, será el dato que podra ser actualizado o no
 * en el ejemplo anterior no es actualizado, cuando el atributo
 * tiene un valor diferente de null, este sera actualizado.
 * El username es un atributo único
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res objeto json con el usuario actualizada
 */
async function updateUsername (req, res){

    /**
     * validar request vacio
     */
    if(!req.body){
        response.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    }else{
        /**
         * creacion objeto con datos de entrada
         */
        const tempUser = {
            idUserIn: req.body.idUser,
            newUsername: req.body.username
        }

        if(!tempUser.idUserIn){
            res.send(
                {
                    message:"Debe ingresar el id del usuario que desea actualizar"
                }
            );
        }else{

            /**
             * validar si el usuario existe
             */
 
            const user = await dbManager.User.findOne(
                {
                    where: {
                        idUser: tempUser.idUserIn
                    }
                }
            );


            if(!user){
                res.send(
                    {
                        message:"El usuario que desea modificar no existe"
                    }
                );
            }else{

                /**
                * update username 
                */

                if(!tempUser.newUsername){
                    console.log("no actualizo username");
                }else{
                    await User.update({ username: tempUser.newUsername}, {
                        where: {
                            idUser: tempUser.idUserIn
                        }
                    });
                }

                /**
                 * return usuario actualizado
                 */
                try {

                    const upUser = await dbManager.User.findOne(
                        {
                            where: {
                                idUser: tempUser.idUserIn
                            }
                        }
                    );
                    res.json(upUser);
                } catch (error) {
                    res.status(500).send(
                        {
                            message: "Error en servidor al actualizar username"
                        }
                    );
                }

            }
        }
    }
}



exports.createUser = createUser;

exports.getAllUsers = getAllUsers;

exports.findOneUserById = findOneUserById;

exports.findOneUserByUsername = findOneUserByUsername;

exports.deleteUserById = deleteUserById;

exports.deleteUserByUsername = deleteUserByUsername;

exports.deleteAllUsers = deleteAllUsers;

exports.findAllUsersByCreatedDate = findAllUsersByCreatedDate;

exports.updateUsername = updateUsername;