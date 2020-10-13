
//import Sequelize
const Sequelize = require("sequelize");
const sequelizeConnection = require("./db.connection");


//import models
const UserModel = require("../models/user.model");
const TweetModel = require("../models/tweet.model");


//Initialize Models
const User = UserModel(sequelizeConnection, Sequelize);
const Tweet = TweetModel(sequelizeConnection, Sequelize);


//Create relations among models
User.hasMany(Tweet, { 
    foreignKey: 'idUser',
    onDelete : 'CASCADE',
});


Tweet.belongsTo (User, {
    foreignKey:'idUser',
    onDelete : 'CASCADE',
});


const db = {
    User,
    Tweet,
    sequelizeConnection
}

module.exports = db;
