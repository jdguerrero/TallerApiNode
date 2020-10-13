const { Tweet } = require("../database/db.manager");
const dbManager = require("../database/db.manager");

/**
 * create a new tweet at db
 * @param {*} req 
 * @param {*} res 
 */
function createTweet(req, res) {

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
        const newTweet = {
            text: req.body.text,
            date: req.body.date,
            device: req.body.device,
            location: req.body.location,
            idUser: req.body.idUser
        }

        
        try {
            //validar si el usuario existe
            const user = await dbManager.User.findOne(
                {
                    where: {
                        idUser: newTweet.idUser
                    }
                }
            );

            //validar llave foranea
            if(!user){
                res.status(400).send({
                    message: "El usuario no existe"
                });
                return;
            }else{
                /**
                 * insert newTweet
                 */
                dbManager.Tweet.create(newTweet).then(
                    data => {
                        res.send(data);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        res.status(400).send({
                            message: "Error al crear tweet"
                        });
                    }
                );
            }

        } catch (error) {
            res.status(400).send({
                message: "Error al crear Tweet"
            });
            return;
        }
    }
}


/**
 * return all tweets in db
 * @param {*} req request http
 * @param {*} res response http
 */

async function getAllTweets (req, res) {

    try {
        const tweets = await dbManager.Tweet.findAll();
        res.json(
            {
                data: tweets
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar tweets"
            }
        );
    }

}


/**
 * return the tweet identificated by id on request
 * @param {*} req id user
 * @param {*} res user information
 */
async function findTweetById(req, res){

    try{

        const {idTweet} = req.params;

        const tweet = await dbManager.Tweet.findOne(
            {
                where : {
                    idTweet: idTweet
                }
            }
        );

        if(!tweet){
            res.send({
                message: "El tweet no existe"
            });
        }else{
            res.json(tweet);
        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error al encontrar tweet"
            }
        );
    }

}


/**
 * return all tweets identificated from username
 * @param {*} req username
 * @param {*} res tweets
 */
async function findAllTweetsByUsername(req, res){

    try{

        const {username} = req.params;

        const user = await dbManager.User.findOne(
            {
                where : {
                    username: username
                }
            }
        );

        /**
         * validar si el usuario existe
         */
        if(!user){
            res.send({
                message: "El usuario no existe"
            });
        }else{

            /**
             * buscar tweets
             */

            const tweets = await dbManager.Tweet.findAll(
                {
                    where : {
                        idUser: user.idUser
                    }
                }
            );
            
            if(!tweets){
                res.send({
                    message: "El usuario no tiene tweets"
                });
            }else{
                res.json(tweets);
            } 
        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error al encontrar tweets"
            }
        );
    }

}



/**
 * Elimina un tweet por su idTweet
 * @param {*} req idTweet del tweet que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function deleteTweetById(req, res){

    try{

        const {idTweet} = req.params;

        const tweet = await dbManager.Tweet.findOne(
            {
                where : {
                    idTweet: idTweet
                }
            }
        );

        /**
         * validar si el tweet existe
         */
        if(!tweet){
            res.send({
                message: "El tweet no existe"
            });
        }else{
            /**
             * eliminar el tweet
             */
            await Tweet.destroy({
                where: {
                    idTweet: idTweet
                }
            });
    
            res.send(
                {
                    message:"Tweet Eliminado"
                }
            );
        }
    }catch(error){
        res.status(500).send(
            {
                message: "Error al eliminar tweet"
            }
        );
    }
}




/**
 * recibe un objeto JSon con la siguiente estructura
 {
  "idTweet": 1,
  "text": null
}
 * se identifica el usuario que se desea cambiar con el idTweet
 * txt, será el dato que podra ser actualizado o no
 * en el ejemplo anterior no es actualizado, cuando el atributo
 * tiene un valor diferente de null, este sera actualizado.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res objeto json con el tweet actualizado
 */
async function updateTextTweet (req, res){

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
        const tempTweet = {
            idTweet: req.body.idTweet,
            text: req.body.text,
            date: req.body.date
        }

        if(!tempTweet.idTweet){
            res.send(
                {
                    message:"Debe ingresar el id del tweet que desea actualizar"
                }
            );
        }else{

            /**
             * validar si el tweet existe
             */
 
            const tweet = await dbManager.Tweet.findOne(
                {
                    where: {
                        idTweet: tempTweet.idTweet
                    }
                }
            );


            if(!tweet){
                res.send(
                    {
                        message:"El tweet que desea modificar no existe"
                    }
                );
            }else{

                /**
                * update text 
                */

                if(!tempTweet.text){
                    console.log("no actualizo text");
                }else{
                    await Tweet.update({ text: tempTweet.text, date: tempTweet.date }, {
                        where: {
                            idTweet: tempTweet.idTweet
                        }
                    });
                }

                /**
                 * return usuario actualizado
                 */
                try {

                    const upTweet = await dbManager.Tweet.findOne(
                        {
                            where: {
                                idTweet: tempTweet.idTweet
                            }
                        }
                    );
                    res.json(upTweet);
                } catch (error) {
                    res.status(500).send(
                        {
                            message: "Error en servidor al actualizar tweet"
                        }
                    );
                }

            }
        }
    }
}



exports.createTweet = createTweet;

exports.getAllTweets = getAllTweets;

exports.findTweetById = findTweetById;

exports.findAllTweetsByUsername = findAllTweetsByUsername;

exports.deleteTweetById = deleteTweetById;

exports.updateTextTweet = updateTextTweet;
