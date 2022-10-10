module.exports = ( sequelize, DataTypes ) => {
    const nike = sequelize.define('nike', {
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return nike
}