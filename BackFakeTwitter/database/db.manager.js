
//import Sequelize
const Sequelize = require("sequelize");
const sequelizeConnection = require("./db.connection");


//import models
const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");


//Initialize Models
const User = UserModel(sequelizeConnection, Sequelize);
const Post = PostModel(sequelizeConnection, Sequelize);


//Create relations among models

User.hasMany(Post, { foreingKey: 'idPost', sourceKey: 'idUser'});

Post.belongsTo (User, { foreingKey: 'idUser', sourceKey: 'idPost'})


const db = {
    User,
    Post,
    sequelizeConnection
}

module.exports = db;
