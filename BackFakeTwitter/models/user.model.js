module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "User",
        {
           idUser: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
               allowNull: false
           },
           username: {
               type: Sequelize.STRING,
               unique: true,
               allowNull: false
           },
           created_date: Sequelize.DATE,
        },
        {
            tableName: "users",
            timestamps: false
        }
    );
    return User;
}