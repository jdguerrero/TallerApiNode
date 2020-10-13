module.exports = (sequelize, Sequelize) => {
    const Tweet = sequelize.define(
        "Tweet",
        {
            idTweet: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true,
               unique: true,
               allowNull: false
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE(0),
                allowNull: false
            },
            device: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: "tweets",
            timestamps: false
        }
    );
    return Tweet;
}