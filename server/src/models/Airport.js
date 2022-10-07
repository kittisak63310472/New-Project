module.exports = ( sequelize, DataTypes ) => {
    const Airport = sequelize.define('Airport', {
        name_location: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        Description: DataTypes.TEXT,
        status: DataTypes.STRING,
    })
    return Airport
}